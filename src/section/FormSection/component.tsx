// Global Components
import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import {
  AvForm,
} from 'availity-reactstrap-validation';

// Components
import type {
  $Component,
} from '../../types';
import SectionHeader from '../../common/SectionHeader';

// Types

type $Item = Record<string, unknown>;

type $OptionalProps = {
  buttonColor?: string;
  changed?: boolean;
  confirm?: {
    labelCloseButton: string;
    labelConfirmButton: string;
    labelContent: string;
    labelHeader: string;
  };
  headerButtons?: $Component<unknown>;
  headerDescription?: string;
  headerIconClass?: string;
  headerTitle?: string;
  onClear?: () => unknown;
};

type $Props = $OptionalProps & {
  fields: $Component<unknown>;
  id: string;
  labelClearButton: string;
  labelSaveButton: string;
  onAction: (arg0: $Item) => unknown;
};

type $State = {
  clear: boolean;
  confirmItem: $Item | null;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    buttonColor: undefined,
    changed: undefined,
    confirm: undefined,
    headerButtons: undefined,
    headerDescription: undefined,
    headerIconClass: undefined,
    headerTitle: undefined,
    onClear: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      clear: false,
      confirmItem: null,
    };
  }

  clear(): void {
    const {
      onClear,
    } = this.props;

    this.setState(
      {
        clear: true,
      },
      () => this.setState(
        {
          clear: false,
        },
        () => onClear && onClear(),
      ),
    );
  }

  renderConfirmDialog() {
    const {
      confirm,
      onAction,
    } = this.props;
    const {
      confirmItem,
    } = this.state;

    return (
      <Modal isOpen={confirmItem !== null}>
        {confirmItem !== null && confirm && (
          <>
            <ModalHeader>
              <p className={'mb-0'}>
                {confirm.labelHeader}
              </p>
            </ModalHeader>
            <ModalBody>
              <p>
                {confirm.labelContent}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color={'warning'}
                onClick={() => {
                  onAction(confirmItem);

                  this.setState({
                    confirmItem: null,
                  });
                }}
              >
                {confirm.labelConfirmButton || 'Confirm'}
              </Button>
              <Button
                color={'secondary'}
                onClick={() => this.setState({
                  confirmItem: null,
                })}
                outline
              >
                {confirm.labelCloseButton}
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    );
  }

  renderClearButton() {
    const {
      changed,
      labelClearButton,
      onClear,
    } = this.props;

    return onClear && changed ? (
      <Button
        className={'mr-2'}
        color={'secondary'}
        onClick={() => this.clear()}
        outline
        type={'button'}
      >
        {labelClearButton}
      </Button>
    ) : null;
  }

  renderButtons(formId: string) {
    const {
      buttonColor,
      changed,
      labelSaveButton,
    } = this.props;

    return (
      <Row>
        <Col className={'border-thin-top text-right pt-2'}>
          {this.renderClearButton()}
          <Button
            color={!changed ? 'default' : buttonColor || 'success'}
            disabled={!changed}
            form={formId}
            outline={!changed}
            type={'submit'}
          >
            {labelSaveButton}
          </Button>
        </Col>
      </Row>
    );
  }

  renderContent() {
    const {
      confirm,
      fields,
      id,
      onAction,
    } = this.props;
    const {
      clear,
    } = this.state;

    const formId = `${id}Form`;

    return (
      <CardBody className={'pb-2'}>
        <AvForm
          id={formId}
          onValidSubmit={(event: Event, values: $Item) => {
            if (confirm) {
              this.setState({
                confirmItem: values,
              });
            } else {
              onAction(values);
            }
          }}
        >
          {!clear && fields}
          {this.renderButtons(formId)}
        </AvForm>
      </CardBody>
    );
  }

  render() {
    const {
      confirm,
      headerButtons,
      headerDescription,
      headerIconClass,
      headerTitle,
      id,
    } = this.props;

    return (
      <Card
        className={'FormSection'}
        id={id}
      >
        {headerTitle && (
          <SectionHeader
            bottomBorder
            description={headerDescription}
            iconClass={headerIconClass}
            rightButtons={headerButtons}
            title={headerTitle}
          />
        )}
        {this.renderContent()}
        {confirm && this.renderConfirmDialog()}
      </Card>
    );
  }
}

export default Component;
