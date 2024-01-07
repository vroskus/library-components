// Global Components
import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

// Components
import TitleSubtitle from '../../common/TitleSubtitle';

// Types
import type {
  $Children,
  $Component,
} from '../../types';

type $OptionalProps = {
  buttonTitle?: string;
  onOpened?: () => unknown;
  size?: 'lg' | 'sm' | 'xl';
};

type $OwnProps = $OptionalProps & {
  children: $Children;
  content: $Component<unknown> | string;
  id: string;
  labelCloseButton: string;
  labelDeleteButton: string;
  onAction: () => unknown;
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
          centered
          id={id}
          isOpen={visible}
          onOpened={onOpened}
          size={size}
          toggle={() => this.toggle()}
        >
          <ModalHeader>
            <TitleSubtitle
              subTitle={subTitle}
              title={title}
            />
          </ModalHeader>
          <ModalBody>
            {content}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              id="dialog-confirm-button"
              onClick={() => onAction() && this.toggle()}
            >
              {buttonTitle || labelDeleteButton}
            </Button>
            <Button
              color="secondary"
              id="dialog-close-button"
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
