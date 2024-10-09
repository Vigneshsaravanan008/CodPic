import React, { useState,useEffect, useRef } from "react";
import { Resizable } from "re-resizable";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
//languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";

//themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-xcode";
import { Col, Container, Row } from "react-bootstrap";
import DropdownSelector from "./DropdownSelector";
import html2canvas from "html2canvas";

function Home() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("github");
  const [code, setCode] = useState('console.log("Hello World")');
  const [icon, setIcon] = useState("/icons/javascript.svg");
  const [background, setBackground] = useState(
    "linear-gradient(354deg,#ff75b5,#ffb86c)"
  );
  const [width,setWidth]=useState("1000");
  const [height,setHeight]=useState("522");
  const editorRef = useRef(null);

  const getLanguageChange = (selectLanguage) => {
    setLanguage(selectLanguage);
  };

  const getThemeChange = (selectTheme) => {
    setTheme(selectTheme);
  };

  const getBackgroundChange = (selectBackground) => {
    setBackground(selectBackground);
  };

  const getIconChange = (value) => {
    setIcon(value);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const exportPng = async () => {
    const editorElem = editorRef.current;

    if (editorElem) {
      const handleElems = document.querySelectorAll(".handle");
      const cursorElem = document.querySelector(".ace_cursor");
      const codetitle = document.querySelector(".code-title");
      const codeEditor = document.querySelector(".ace_editor");

      handleElems.forEach((elem) => {
        elem.style.display = "none";
      });
      if (cursorElem) cursorElem.style.display = "none";
      if (codetitle) codetitle.style.boxShadow = "none";
      if (codeEditor) codeEditor.style.boxShadow = "none";

      const canvas = await html2canvas(editorElem);
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.download = "code.png";
      link.href = image;
      link.click();

      handleElems.forEach((elem) => {
        elem.style.display = "block";
      });
      if (cursorElem) cursorElem.style.display = "block";
      if (codetitle)
        codetitle.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
      if (codeEditor)
        codeEditor.style.boxShadow = "2px 3px 10px rgba(0, 0, 0, 0.2)";
    }
  };

  const handleResize=(e, direction, ref, d)=>{
    setHeight(d.height);
    // setWidth(width+ref.width);
    // setHeight(height+ref.height);
  }

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <Container className="py-lg-5 py-4 py-md-5">
        <Row>
          <Col lg={3} md={4} sm={12}>
            <DropdownSelector
              onLanguageChange={getLanguageChange}
              onThemeChange={getThemeChange}
              onBackgroundChange={getBackgroundChange}
              onIconChange={getIconChange}
              exportImage={exportPng}
            />
          </Col>
          <Col lg={9} md={8} sm={12}>
            <div ref={editorRef}>
            <Resizable
              minHeight={522}
              minWidth={700}
              maxWidth={1000}
              defaultSize={{
                width: width,
                height: height || 500,
              }}
              style={{ background: background }}
              onResize={handleResize}
            >
              <div className="d-flex justify-content-center-align-items-center">
                <img src={icon} className="avatar" alt="" />
                <AceEditor
                  mode={language.toLocaleLowerCase()}
                  theme={theme}
                  fontSize={14}
                  showGutter={false}
                  showPrintMargin={false}
                  highlightActiveLine={false}
                  value={code}
                  editorProps={{ $blockScrolling: true }}
                  onChange={handleCodeChange}
                  className="ace-editor-container"
                />
              </div>
            </Resizable>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
