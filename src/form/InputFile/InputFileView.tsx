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

// Types
type $OptionalProps = {
  className?: string;
  disabled?: boolean;
  imageThumbDirUrl?: string;
  label?: string;
  onChange?: (arg0: string | null) => unknown;
  required?: boolean;
  value?: string | null;
};

type $Props = $OptionalProps & {
  uploadUrl: string;
  labelChangeFile: string;
  labelError: string;
  labelFile: string;
  name: string;
  onError: (arg0: Error) => unknown;
  fileDirUrl: string;
};

type $State = {
  error: Error | null;
  loading: boolean;
  value?: string | null;
};

class InputFileView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    disabled: undefined,
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

  async handleFile(type: 'image' | 'file', content: Blob): Promise<void> {
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
    } catch (error) {
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
        color="warning"
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
        name={`_${name}`}
        type="file"
        accept="image/png,image/gif,image/jpeg"
        value={value}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];

          this.handleFile(
            'image',
            file,
          );
        }}
        required={required}
        disabled={disabled}
        invalid={error !== null}
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
        <div className="form-control py-0 InputFile-image-thumbnail text-center">
          <ModalImage
            large={`${fileDirUrl}/${value || ''}`}
            small={`${imageThumbDirUrl || ''}/${value || ''}`}
            className="img-fluid"
          />
        </div>
        <div className="input-group-append">
          {this.renderChangeFileButton()}
        </div>
      </div>
    );
  }

  renderFileInput() {
    const {
      className,
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
        className={className}
        name={`_${name}`}
        type="file"
        accept="application/pdf,image/png,image/gif,image/jpeg"
        value={value}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];

          this.handleFile(
            'file',
            file,
          );
        }}
        required={required}
        disabled={disabled}
        invalid={error !== null}
      />
    );
  }

  renderFile() {
    const {
      className,
      fileDirUrl,
      labelFile,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <div className={`input-group ${className || ''}`}>
        <div className="input-group-prepend">
          <span className="input-group-text">
            <em className="icon-doc" />
          </span>
        </div>
        <div className="form-control">
          <a
            href={`${fileDirUrl}/${value || ''}`}
            target="_blank"
            rel="noreferrer"
          >
            {labelFile}
          </a>
        </div>
        <div className="input-group-append">
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
          type="text"
          value={value}
          style={{
            display: 'none',
          }}
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
      <FormGroup className="InputFile">
        {label && <Label>{label}</Label>}
        {loading ? (
          <div className="form-control py-0 text-center">
            <Spinner color="primary" />
          </div>
        ) : this.renderContent()}
        <FormFeedback>
          {errorMessage}
        </FormFeedback>
      </FormGroup>
    );
  }
}

export default InputFileView;
