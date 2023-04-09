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
} from '@vroskus/library-types';

type $OptionalProps = {
  buttonTitle?: string;
  onOpened?: () => unknown;
  size?: 'sm' | 'lg' | 'xl';
};

type $OwnProps = $OptionalProps & {
  onAction: () => unknown;
  children: $Children;
  content: $Component<unknown> | string;
  id: string;
  labelCloseButton: string;
  labelDeleteButton: string;
  subTitle: string;
  title: string;
};

type $Props = $OwnProps;

type $State = {
  visible: boolean;
};

class DeleteDialogView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    buttonTitle: undefined,
    onOpened: undefined,
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
      buttonTitle,
      content,
      id,
      labelCloseButton,
      labelDeleteButton,
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
        {this.childrenWithToggleHandler()}
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
          <ModalBody>
            {content}
          </ModalBody>
          <ModalFooter>
            <Button
              id="dialog-confirm-button"
              color="danger"
              onClick={() => onAction() && this.toggle()}
            >
              {buttonTitle || labelDeleteButton}
            </Button>
            <Button
              id="dialog-close-button"
              color="secondary"
              onClick={() => this.toggle()}
            >
              {labelCloseButton}
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default DeleteDialogView;
