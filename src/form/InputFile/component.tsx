// Global Components
import * as React from 'react';
import {
  Button,
  FormFeedback,
  FormGroup,
  Label,
  Spinner,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';
import ModalImage from 'react-modal-image';

// Helpers
import _ from 'lodash';

// Enums
const inputAccept = {
  image: [
    'image/png',
    'image/gif',
    'image/jpeg',
  ],
  pdf: [
    'application/pdf',
  ],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

// Types
type $OptionalProps = {
  accept?: Array<keyof typeof inputAccept>;
  className?: string;
  disabled?: boolean;
  iconClass?: string;
  imageThumbDirUrl?: string;
  label?: string;
  onChange?: (arg0: null | string) => unknown;
  required?: boolean;
  value?: null | string;
};

type $Props = $OptionalProps & {
  fileDirUrl: string;
  labelChangeFile: string;
  labelError: string;
  labelFile: string;
  name: string;
  onError: (arg0: Error) => unknown;
  uploadUrl: string;
};

type $State = {
  error: Error | null;
  loading: boolean;
  value?: null | string;
};

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
    accept: undefined,
    className: undefined,
    disabled: undefined,
    iconClass: undefined,
    imageThumbDirUrl: undefined,
    label: undefined,
    onChange: undefined,
    required: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      error: null,
      loading: false,
      value: props.value,
    };
  }

  componentDidUpdate(prevProps: $Props): void {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value,
      });
    }
  }

  async handleFile(type: 'file' | 'image', content: Blob): Promise<void> {
    const {
      onChange,
      onError,
      uploadUrl,
    } = this.props;

    try {
      await this.setStateAsync({
        error: null,
        loading: true,
      });

      const url = uploadUrl;
      const data = new FormData();

      data.append(
        'file',
        content,
      );

      const params = {
        body: data,
        'Content-Type': 'multipart/form-data',
        method: 'POST',
      };
      const response = await fetch(
        url,
        params,
      );
      const responseData = await response.json();

      const value = responseData.fileName;

      await this.setStateAsync({
        loading: false,
        value,
      });

      if (onChange) {
        onChange(value);
      }
    } catch (err) {
      const error = err as Error;

      await this.setStateAsync({
        error,
        loading: false,
      });

      onError(error);
    }
  }

  setStateAsync(state: Partial<$State>): Promise<void> {
    return new Promise((resolve) => {
      this.setState(
        (pervState: $State) => ({
          ...pervState,
          ...state,
        }),
        resolve,
      );
    });
  }

  renderChangeFileButton() {
    const {
      labelChangeFile,
      onChange,
    } = this.props;

    return (
      <Button
        color={'warning'}
        onClick={() => {
          this.setState({
            value: null,
          });

          if (onChange) {
            onChange(null);
          }
        }}
      >
        {labelChangeFile}
      </Button>
    );
  }

  renderImageInput() {
    const {
      disabled,
      name,
      required,
    } = this.props;
    const {
      error,
      value,
    } = this.state;

    return (
      <AvInput
        accept={inputAccept.image.join(',')}
        disabled={disabled}
        invalid={error !== null}
        name={`_${name}`}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];

          this.handleFile(
            'image',
            file,
          );
        }}
        required={required}
        type={'file'}
        value={value}
      />
    );
  }

  renderImage() {
    const {
      className,
      fileDirUrl,
      imageThumbDirUrl,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <div className={`input-group ${className || ''}`}>
        <div className={'form-control py-0 InputFile-image-thumbnail text-center'}>
          <ModalImage
            className={'img-fluid'}
            large={`${fileDirUrl}/${value || ''}`}
            small={`${imageThumbDirUrl || ''}/${value || ''}`}
          />
        </div>
        <div className={'input-group-append'}>
          {this.renderChangeFileButton()}
        </div>
      </div>
    );
  }

  renderFileInput() {
    const {
      accept,
      className,
      disabled,
      name,
      required,
    } = this.props;
    const {
      error,
      value,
    } = this.state;

    let acceptStack: Array<string> = [];

    if (accept) {
      accept.forEach((i) => {
        acceptStack = [
          ...acceptStack,
          ...inputAccept[i],
        ];
      });
    } else {
      acceptStack = inputAccept.pdf;
    }

    return (
      <AvInput
        accept={acceptStack.join(',')}
        className={className}
        disabled={disabled}
        invalid={error !== null}
        name={`_${name}`}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];

          this.handleFile(
            'file',
            file,
          );
        }}
        required={required}
        type={'file'}
        value={value}
      />
    );
  }

  renderFile() {
    const {
      className,
      fileDirUrl,
      iconClass,
      labelFile,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <div className={`input-group ${className || ''}`}>
        <div className={'input-group-prepend'}>
          <span className={'input-group-text'}>
            <em className={iconClass || 'icon-doc'} />
          </span>
        </div>
        <div className={'form-control'}>
          <a
            href={`${fileDirUrl}/${value || ''}`}
            rel={'noreferrer'}
            target={'_blank'}
          >
            {labelFile}
          </a>
        </div>
        <div className={'input-group-append'}>
          {this.renderChangeFileButton()}
        </div>
      </div>
    );
  }

  renderInput() {
    const {
      imageThumbDirUrl,
    } = this.props;

    return imageThumbDirUrl ? this.renderImageInput() : this.renderFileInput();
  }

  renderValue() {
    const {
      imageThumbDirUrl,
    } = this.props;

    return imageThumbDirUrl ? this.renderImage() : this.renderFile();
  }

  renderContent() {
    const {
      name,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        {value ? this.renderValue() : this.renderInput()}
        <AvInput
          name={name}
          style={{
            display: 'none',
          }}
          type={'text'}
          value={value}
        />
      </>
    );
  }

  render() {
    const {
      label,
      labelError,
    } = this.props;
    const {
      error,
      loading,
    } = this.state;

    const errorMessage: string = _.get(
      error,
      'response.data.message',
    ) || labelError;

    return (
      <FormGroup className={'InputFile'}>
        {label && (
          <Label>
            {label}
          </Label>
        )}
        {loading ? (
          <div className={'form-control py-0 text-center'}>
            <Spinner color={'primary'} />
          </div>
        ) : this.renderContent()}
        <FormFeedback>
          {errorMessage}
        </FormFeedback>
      </FormGroup>
    );
  }
}

export default Component;
