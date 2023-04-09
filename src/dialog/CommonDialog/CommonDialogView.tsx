// Global Components
import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

// Types
import type {
  $Children,
  $Component,
} from '../../types';

type $OptionalProps = {
  onAction?: () => unknown;
  children?: $Children;
  closeAction?: () => unknown;
  instant?: boolean;
  onOpened?: () => unknown;
  size?: 'sm' | 'lg' | 'xl';
  subTitle?: string;
};

type $OwnProps = $OptionalProps & {
  content: $Component<unknown> | string;
  id: string;
  labelCloseButton: string;
  labelConfirmButton: string;
  title: string;
};

type $Props = $OwnProps;

type $State = {
  visible: boolean;
};

class CommonDialogView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    children: undefined,
    closeAction: undefined,
    instant: undefined,
    onAction: undefined,
    onOpened: undefined,
    size: undefined,
    subTitle: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      visible: props.instant || false,
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
      closeAction,
      content,
      id,
      instant,
      labelCloseButton,
      labelConfirmButton,
      onAction,
      onOpened,
      size,
      subTitle,
      title,
    } = this.props;
    const {
      visible,
    } = this.state;

    return (
      <>
        {!instant && this.childrenWithToggleHandler()}
        <Modal
          id={id}
          isOpen={visible}
          toggle={() => this.toggle()}
          centered
          size={size}
          onOpened={onOpened}
        >
          <ModalHeader>
            <p className="mb-0">{title}</p>
            {subTitle && <small>{subTitle}</small>}
          </ModalHeader>
          <ModalBody className="p-0">
            {content}
          </ModalBody>
          <ModalFooter>
            {onAction && (
            <Button
              id="dialog-confirm-button"
              color="success"
              onClick={() => {
                onAction();

                this.toggle();
              }}
            >
              {labelConfirmButton}
            </Button>
            )}
            <Button
              id="dialog-close-button"
              color="secondary"
              onClick={() => {
                if (closeAction) {
                  closeAction();
                }

                this.toggle();
              }}
            >
              {labelCloseButton}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default CommonDialogView;
