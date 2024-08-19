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
  value?: null | string;
  width?: number;
};

type $Props = $OptionalProps & {
  name: string;
};

enum Color {
  black = 'black',
  green = 'green',
  red = 'red',
  white = 'white',
}

/* eslint-disable complexity */
const Component = function ({
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
    penColor: 'black',
    penWidth: 3,
  });

  const [xml, setXml] = useState('');
  const [color, setColor] = useState(Color.black);

  const setPenColor = useCallback(
    (v) => {
      changePenColor(v);
      setColor(v);
    },
    [changePenColor, setColor],
  );

  const setPenWidth = useCallback(
    (v) => {
      changePenWidth(v);
    },
    [changePenWidth],
  );

  const handleChangeXML = useCallback(
    () => {
      const updatedXml = getSvgXML();

      if (updatedXml !== null) {
        setXml(updatedXml);

        if (onChange) {
          onChange(updatedXml);
        }
      }
    },
    [getSvgXML, onChange],
  );

  if (instance && value && xml === '') {
    instance.parseSVGString(value);
  }

  const style = {
    border: '1px solid #eee',
    height: height || 420,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: width || 420,
  };

  return (
    <>
      {label && (
        <Label>
          {label}
        </Label>
      )}
      <div
        className={'mb-1'}
        style={{
          display: 'flex',
          justifyContent: 'flexWrap',
        }}
      >
        <div
          onMouseLeave={handleChangeXML}
          onTouchEnd={handleChangeXML}
          ref={divRef}
          style={style}
        />
      </div>
      <ButtonGroup className={'d-flex mb-3'}>
        <Button
          active={color === Color.black}
          className={'w-100'}
          onClick={() => {
            setPenWidth(3);
            setPenColor(Color.black);
          }}
        >
          <em
            className={'fa fa-pen'}
            style={{
              color: Color.black,
            }}
          />
        </Button>
        <Button
          active={color === Color.red}
          className={'w-100'}
          onClick={() => {
            setPenWidth(3);
            setPenColor(Color.red);
          }}
        >
          <em
            className={'fa fa-pen'}
            style={{
              color: Color.red,
            }}
          />
        </Button>
        <Button
          active={color === Color.green}
          className={'w-100'}
          onClick={() => {
            setPenWidth(3);
            setPenColor(Color.green);
          }}
        >
          <em
            className={'fa fa-pen'}
            style={{
              color: Color.green,
            }}
          />
        </Button>
        <Button
          active={color === Color.white}
          className={'w-100'}
          onClick={() => {
            setPenWidth(10);
            setPenColor(Color.white);
          }}
        >
          <em className={'fa fa-eraser'} />
        </Button>
        <Button
          className={'w-100'}
          onClick={undo}
        >
          <em className={'fa fa-undo'} />
        </Button>
        <Button
          className={'w-100'}
          onClick={clear}
        >
          <em className={'fa fa-trash-alt'} />
        </Button>
      </ButtonGroup>
      <AvInput
        name={name}
        style={{
          display: 'none',
        }}
        value={xml}
      />
    </>
  );
};

Component.defaultProps = {
  height: undefined,
  label: undefined,
  onChange: undefined,
  value: undefined,
  width: undefined,
};

export default Component;
