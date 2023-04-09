// Global Components
import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import {
  AvForm,
} from 'availity-reactstrap-validation';

// Types
import type {
  $Children,
  $Component,
} from '@vroskus/library-types';

type $Item = Record<string, unknown>;

type $OptionalProps = {
  buttonColor?: string;
  onOpened?: () => unknown;
  overflowControl?: boolean;
  size?: 'sm' | 'lg' | 'xl';
};

type $OwnProps = $OptionalProps & {
  onAction: (arg0: $Item) => unknown;
  children: $Children;
  fields: $Component<unknown>;
  id: string;
  subTitle: string;
  title: string;
  labelSaveButton: string;
  labelCloseButton: string;
};

type $Props = $OwnProps;

type $State = {
  visible: boolean;
};

class FormDialogView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    buttonColor: undefined,
    onOpened: undefined,
    overflowControl: undefined,
    size: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  toggle(): void {
    this.setState((prevState: $State) => ({
      visible: !prevState.visible,
    }));
  }

  childrenWithToggleHandler(): $Component<unknown> {
    const {
      children,
    } = this.props;

    if (children && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        {
          // @ts-ignore
          onClick: () => this.toggle(),
        },
      );
    }

    // @ts-ignore
    return children;
  }

  render() {
    const {
      buttonColor,
      fields,
      id,
      labelCloseButton,
      labelSaveButton,
      onAction,
      onOpened,
      overflowControl,
      size,
      subTitle,
      title,
    } = this.props;
    const {
      visible,
    } = this.state;

    return (
      <>
        {this.childrenWithToggleHandler()}
        <Modal
          id={id}
          isOpen={visible}
          toggle={() => this.toggle()}
          centered
          size={size}
          onOpened={onOpened}
          backdrop="static"
        >
          <AvForm
            onValidSubmit={(
              event: Event,
              values: $Item,
            ) => onAction(values) && this.toggle()}
          >
            <ModalHeader>
              <p className="mb-0">{title}</p>
              {subTitle && <small>{subTitle}</small>}
            </ModalHeader>
            <ModalBody style={overflowControl ? {
              maxHeight: 'calc(100vh - 210px)',
              overflowY: 'auto',
            } : {
            }}
            >
              {fields}
            </ModalBody>
            <ModalFooter>
              <Button
                id="dialog-confirm-button"
                color={buttonColor || 'success'}
                type="submit"
              >
                {labelSaveButton}
              </Button>
              <Button
                id="dialog-close-button"
                color="secondary"
                onClick={() => this.toggle()}
              >
                {labelCloseButton}
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </>
    );
  }
}

export default FormDialogView;
