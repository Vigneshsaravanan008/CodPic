import React, { useState, useEffect, useRef } from "react";
import { Resizable } from "re-resizable";
import AceEditor from "react-ace";
import { GrGithub } from "react-icons/gr";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { Badge,Button } from "react-bootstrap";
import { FaCode } from "react-icons/fa";
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
import { Col, Container, Row, Form } from "react-bootstrap";
import DropdownSelector from "./DropdownSelector";
import html2canvas from "html2canvas";

function Home() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("twilight");
  const [code, setCode] = useState(`function calcAddition(number1, number2) { 
    return number1 + number2; 
}
console.log(calcAddition(6,9));`);
  const [icon, setIcon] = useState("/icons/javascript.svg");
  const [background, setBackground] = useState(
    "linear-gradient(337deg,#654ea3,#da98b4)"
  );
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
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
    const editorElem = document.querySelector(".resize_element");
    console.log(editorElem);
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

  const handleResize = (e, direction, ref, d) => {
    const newHeight = ref.style.height;
    setHeight(parseInt(newHeight, 10));
  };

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="App py-lg-3">
      <Container className="py-lg-5 py-4 py-md-5">
        <div className="d-flex justify-content-between">
            <h3 className=""> 
                <span className="text-header">Cod</span><span className="text-header">Pic</span>
            </h3>
            <Button
                href="https://vigneshsaravanan.vercel.app/"
                className="home_button"
                target="_blank"
                rel="noopener"
                variant="outline-light"
            >
                <FaCode /> Dev <GoArrowUpRight />
            </Button>
        </div>
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
          <Col lg={9} md={8} sm={12} ref={editorRef}>
            <Resizable
              minHeight={500}
              minWidth={510}
              maxWidth={800}
              defaultSize={{
                width: width,
                height: height || 500,
              }}
              style={{ background: background }}
              onResize={handleResize}
              className="resize_element"
            >
              <div className="p-4">
                
                <div className="d-flex justify-content-between input_title">
                    <div className="d-flex justify-content-center align-items-center ms-2">
                        <Badge pill bg="danger" className="me-1" style={{ width: '12px', height: '12px' }}>&nbsp;</Badge>
                        <Badge pill bg="warning" className="me-1" style={{ width: '12px', height: '12px' }}>&nbsp;</Badge>
                        <Badge pill bg="success" className="me-1" style={{ width: '12px', height: '12px' }}>&nbsp;</Badge>
                    </div>
                  <Form.Control
                    size="lg"
                    type="text"
                    className="text-center text-title"
                    value="app.js"
                  />
                  <div className="d-flex justify-content-center align-items-center me-4">
                    <img src={icon} className="avatar" alt="" />
                  </div>
                </div>
                <AceEditor
                  mode={language.toLocaleLowerCase()}
                  theme={theme}
                  fontSize={14}
                //   showGutter={false}
                  showPrintMargin={false}
                  highlightActiveLine={false}
                  value={code}
                  height={`${height - 120}px`}
                  editorProps={{ $blockScrolling: true }}
                  className="ace-editor-container"
                  onChange={handleCodeChange}
                />
              </div>
            </Resizable>
          </Col>
        </Row>
        <div className="d-flex flex-lg-row flex-column justify-content-center justify-content-lg-between align-items-center text-center py-lg-1 py-md-1 py-1 mt-5 border_footer">
          <p className='text-white text-lg-start mb-1'>Built From Scratch With 💚</p>
          <p className='text-white text-lg-start mb-0'> © {new Date().getFullYear()} All rights reserved </p>
          <div>
            <Link target='_blank' to="https://github.com/Vigneshsaravanan008" rel="noopener" aria-label="Github Account"><GrGithub className="footer_icons px-3" /></Link>
            {/* <Link target='_blank' to="https://www.instagram.com/vignesh___saravanan" rel="noopener" aria-label="Instagram Account"><IoLogoInstagram className="footer_icons px-3" /></Link> */}
            <Link target='_blank' to="https://www.linkedin.com/in/vignesh-saravanan-9839481a4/" rel="noopener" aria-label="Linkedin Account"><IoLogoLinkedin className="footer_icons px-3" /></Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
