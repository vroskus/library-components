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

// Components
import TitleSubtitle from '../../common/TitleSubtitle';

// Types
import type {
  $Children,
  $Component,
} from '../../types';

type $Item = Record<string, unknown>;

type $OptionalProps = {
  buttonColor?: string;
  leftButtons?: $Component<unknown>;
  onOpened?: () => unknown;
  overflowControl?: boolean;
  size?: 'lg' | 'sm' | 'xl';
};

type $OwnProps = $OptionalProps & {
  children: $Children;
  fields: $Component<unknown>;
  id: string;
  labelCloseButton: string;
  labelSaveButton: string;
  onAction: (arg0: $Item) => unknown;
  subTitle: string;
  title: string;
};

type $Props = $OwnProps;

type $State = {
  visible: boolean;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    buttonColor: undefined,
    leftButtons: undefined,
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
      leftButtons,
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

    const formId = `${id}Form`;

    return (
      <>
        {this.childrenWithToggleHandler()}
        <Modal
          backdrop="static"
          centered
          className="FormDialog"
          id={id}
          isOpen={visible}
          onOpened={onOpened}
          size={size}
          toggle={() => this.toggle()}
        >
          <AvForm
            id={formId}
            onValidSubmit={(
              event: Event,
              values: $Item,
            ) => onAction(values) && this.toggle()}
          >
            <ModalHeader>
              <TitleSubtitle
                subTitle={subTitle}
                title={title}
              />
            </ModalHeader>
            <ModalBody
              style={overflowControl ? {
                maxHeight: 'calc(100vh - 210px)',
                overflowY: 'auto',
              } : undefined}
            >
              {fields}
            </ModalBody>
            <ModalFooter>
              {leftButtons && (
                <div className="mr-auto">
                  {leftButtons}
                </div>
              )}
              <div>
                <Button
                  className="mr-1"
                  color={buttonColor || 'success'}
                  form={formId}
                  id="dialog-confirm-button"
                  type="submit"
                >
                  {labelSaveButton}
                </Button>
                <Button
                  color="secondary"
                  id="dialog-close-button"
                  onClick={() => this.toggle()}
                >
                  {labelCloseButton}
                </Button>
              </div>
            </ModalFooter>
          </AvForm>
        </Modal>
      </>
    );
  }
}

export default Component;
