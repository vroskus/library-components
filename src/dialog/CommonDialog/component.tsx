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
  children?: $Children;
  closeAction?: () => unknown;
  instant?: boolean;
  leftButtons?: $Component<unknown>;
  onAction?: () => unknown;
  onOpened?: () => unknown;
  size?: 'lg' | 'sm' | 'xl';
  subTitle?: string;
};

type $Props = $OptionalProps & {
  content: $Component<unknown> | string;
  id: string;
  labelCloseButton: string;
  labelConfirmButton: string;
  title: string;
};

type $State = {
  visible: boolean;
};

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
    children: undefined,
    closeAction: undefined,
    instant: undefined,
    leftButtons: undefined,
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
      leftButtons,
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
          centered
          className={'CommonDialog'}
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
          <ModalBody className={'p-0'}>
            {content}
          </ModalBody>
          <ModalFooter>
            {leftButtons && (
              <div className={'mr-auto'}>
                {leftButtons}
              </div>
            )}
            <div>
              {onAction && (
                <Button
                  className={'mr-1'}
                  color={'success'}
                  id={'dialog-confirm-button'}
                  onClick={() => {
                    onAction();

                    this.toggle();
                  }}
                >
                  {labelConfirmButton}
                </Button>
              )}
              <Button
                color={'secondary'}
                id={'dialog-close-button'}
                onClick={() => {
                  if (closeAction) {
                    closeAction();
                  }

                  this.toggle();
                }}
              >
                {labelCloseButton}
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Component;
