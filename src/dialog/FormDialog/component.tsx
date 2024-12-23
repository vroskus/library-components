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

// Helpers
import _ from 'lodash';

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

type $Props = $OptionalProps & {
  children: $Children;
  content: $Component<unknown>;
  id: string;
  labelCloseButton: string;
  labelConfirmButton: string;
  onAction: (arg0: $Item) => unknown;
  subTitle: string;
  title: string;
};

type $State = {
  visible: boolean;
};

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
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
      content,
      id,
      labelCloseButton,
      labelConfirmButton,
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
          backdrop={'static'}
          centered
          className={'FormDialog'}
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
            ) => {
              const targetFormId: string | undefined = _.get(
                event,
                'target.id',
              );

              if (targetFormId === formId) {
                onAction(values);

                this.toggle();
              }
            }}
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
              {content}
            </ModalBody>
            <ModalFooter>
              {leftButtons && (
                <div className={'mr-auto'}>
                  {leftButtons}
                </div>
              )}
              <div>
                <Button
                  className={'mr-1'}
                  color={buttonColor || 'success'}
                  form={formId}
                  id={'dialog-confirm-button'}
                  type={'submit'}
                >
                  {labelConfirmButton}
                </Button>
                <Button
                  color={'secondary'}
                  id={'dialog-close-button'}
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
