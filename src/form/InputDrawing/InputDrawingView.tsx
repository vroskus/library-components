// Global Components
import React, {
  Fragment,
  useCallback,
  useState,
} from 'react';
import {
  Button,
  ButtonGroup,
  Label,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';
import {
  useSvgDrawing,
} from 'react-hooks-svgdrawing';

// Types
import type {
  $Component,
} from '../../types';

type $OptionalProps = {
  height?: number;
  label?: string;
  onChange?: (value: string) => unknown;
  value?: string | null;
  width?: number;
};

type $Props = $OptionalProps & {
  name: string;
};

const color = {
  black: 'black',
  green: 'green',
  red: 'red',
  white: 'white',
};

/* eslint-disable complexity */
const InputDrawingView = function ({
  height,
  label,
  name,
  onChange,
  value,
  width,
}: $Props): $Component<$Props> {
  const [divRef, {
    changePenColor,
    changePenWidth,
    clear,
    getSvgXML,
    instance,
    undo,
  }] = useSvgDrawing({
    penColor: color.black,
    penWidth: 3,
  });

  const [xml, setXml] = useState('');
  const [penColor, setPenColor] = useState(color.black);

  const handleColor = useCallback(
    (v) => {
      changePenColor(v);
      setPenColor(v);
    },
    [changePenColor, setPenColor],
  );

  const handlePenWidth = useCallback(
    (v) => {
      changePenWidth(v);
    },
    [changePenWidth],
  );

  const handleChangeXML = useCallback(
    () => {
      const updatedXml = getSvgXML();

      setXml(updatedXml);

      if (onChange) {
        onChange(updatedXml);
      }
    },
    [getSvgXML, onChange],
  );

  if (instance && value && xml === '') {
    instance.parseSVGString(value);
  }

  return (
    <>
      {label && <Label>{label}</Label>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flexWrap',
        }}
        className="mb-1"
      >
        <div
          ref={divRef}
          style={{
            border: '1px solid #eee',
            height: height || 420,
            width: width || 420,
          }}
          onTouchEnd={handleChangeXML}
          onMouseLeave={handleChangeXML}
        />
      </div>
      <ButtonGroup className="d-flex mb-3">
        <Button
          className="w-100"
          onClick={() => {
            handlePenWidth(3);
            handleColor(color.black);
          }}
          active={penColor === color.black}
        >
          <em
            className="fa fa-pen"
            style={{
              color: color.black,
            }}
          />
        </Button>
        <Button
          className="w-100"
          onClick={() => {
            handlePenWidth(3);
            handleColor(color.red);
          }}
          active={penColor === color.red}
        >
          <em
            className="fa fa-pen"
            style={{
              color: color.red,
            }}
          />
        </Button>
        <Button
          className="w-100"
          onClick={() => {
            handlePenWidth(3);
            handleColor(color.green);
          }}
          active={penColor === color.green}
        >
          <em
            className="fa fa-pen"
            style={{
              color: color.green,
            }}
          />
        </Button>
        <Button
          className="w-100"
          onClick={() => {
            handlePenWidth(10);
            handleColor(color.white);
          }}
          active={penColor === color.white}
        >
          <em className="fa fa-eraser" />
        </Button>
        <Button
          className="w-100"
          onClick={undo}
        >
          <em className="fa fa-undo" />
        </Button>
        <Button
          className="w-100"
          onClick={clear}
        >
          <em className="fa fa-trash-alt" />
        </Button>
      </ButtonGroup>
      <AvInput
        name={name}
        value={xml}
        style={{
          display: 'none',
        }}
      />
    </>
  );
};

InputDrawingView.defaultProps = {
  height: undefined,
  label: undefined,
  onChange: undefined,
  value: undefined,
  width: undefined,
};

export default InputDrawingView;
