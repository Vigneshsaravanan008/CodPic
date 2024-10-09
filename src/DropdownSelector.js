import React, { useState } from "react";
import { Card, Form, Dropdown, DropdownButton,Button } from "react-bootstrap";
import { languages, backgrounds, themes } from "./utils/utilities";
import { Download } from "lucide-react";

function DropdownSelector({onLanguageChange,onThemeChange,onBackgroundChange,onIconChange,exportImage}) {
    const [background,setBackground]=useState("linear-gradient(354deg,#ff75b5,#ffb86c)")
    const getLanguageChange=(e)=>{
        onLanguageChange(e.target.value);
        onIconChange(e.target.childNodes[e.target.selectedIndex].getAttribute('data-icon'));
    }

    const getThemeChange=(value)=>{
        onThemeChange(value);
    }

    const getBackgroundChange=(value)=>{
        setBackground(value);
        onBackgroundChange(value);
    }

  return (
    <>
      <Card
        style={{ background: "#0a0a0a", borderColor: "#3c3c3c" }}
        className="dropdown_form"
      >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white">Language</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>getLanguageChange(e)}>
                <option>Select Language</option>
                {languages.map(function (value, key) {
                  return (
                    <option value={value.name} data-icon={value.icon} key={key} selected={key == 0}>
                      {value.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white">Code Theme</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e)=>getThemeChange(e.target.value)}>
                <option>Select Themes</option>
                {themes.map(function (value, key) {
                  return (
                    <option value={value}  key={key} selected={key == 0}>
                      {value}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-white d-flex justify-content-between">Background Themes
              <div
                    className="rounded-circle me-2 mt-1"
                    style={{
                        width: "20px",
                        height: "20px",
                        background: background,
                    }}
                ></div>
              </Form.Label>
               
              <DropdownButton id="dropdown-basic-button" title="Themes">
                {backgrounds.map(function (value, key) {
                  return (
                    <Dropdown.Item
                      key={key}
                      className="d-flex align-items-center"
                      style={{ width: "150px" }}
                      onClick={(e)=>{getBackgroundChange(value)}}
                    >
                      <div
                        className="rounded-circle me-2"
                        style={{
                          width: "20px",
                          height: "20px",
                          background: value,
                        }}
                      ></div>
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Form.Group>
          </Form>
            <Button onClick={exportImage} variant="outline-primary">
                <Download />
                Export PNG
            </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default DropdownSelector;
