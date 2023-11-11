// Global Components
import * as React from 'react';
import {
  FormGroup,
  Label,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';
import {
  AsyncTypeahead,
} from 'react-bootstrap-typeahead';

// Helpers
import _ from 'lodash';

// Types
type $Ref = {
  contains: (arg0: Event['target']) => boolean,
  hideMenu: () => void,
};

type $Option = {
  id: string,
} & Record<string, unknown>;

type $Options = Array<$Option>;

type $OptionalProps = {
  className?: string | void;
  label?: string | void;
  labelKey?: string | void;
  minLength?: number | void;
  onOptionSelect?: (option: $Option | void) => (string | void);
  placeholder?: string | void;
  required?: boolean | void;
  value?: string | null | void;
};

type $Props = $OptionalProps & {
  getOptions: (query: string) => Promise<Array<$Option>>;
  name: string;
};

type $State = {
  loading: boolean;
  options: $Options;
  value?: string | null | void;
};

class InputTypeaheadView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    label: undefined,
    labelKey: undefined,
    minLength: undefined,
    onOptionSelect: undefined,
    placeholder: undefined,
    required: undefined,
    value: undefined,
  };

  wrapperRef: React.RefObject<$Ref>;

  handleClickOutsideBind: (event: Event) => void;

  constructor(props: $Props) {
    super(props);

    this.state = {
      loading: false,
      options: [],
      value: props.value,
    };

    this.wrapperRef = React.createRef<$Ref>();

    this.handleClickOutsideBind = this.handleClickOutside.bind(this);
  }

  componentDidMount(): void {
    document.addEventListener(
      'mousedown',
      this.handleClickOutsideBind,
    );
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value,
      });
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener(
      'mousedown',
      this.handleClickOutsideBind,
    );
  }

  handleClickOutside(event: Event): void {
    if (this.wrapperRef && this.wrapperRef.current !== null) {
      const {
        contains,
        hideMenu,
      } = this.wrapperRef.current;

      if (contains && contains(event.target)) {
        hideMenu();
      }
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

  render() {
    const {
      className,
      getOptions,
      label,
      labelKey,
      minLength,
      name,
      onOptionSelect,
      placeholder,
      required,
    } = this.props;
    const {
      loading,
      options,
      value,
    } = this.state;

    const labelKeyToUse: string = labelKey || 'Name';

    return (
      <FormGroup className={`InputTypeahead ${className || ''}`}>
        {label && <Label>{label}</Label>}
        <AsyncTypeahead
          id={name}
          minLength={minLength || 3}
          useCache={false}
          filterBy={() => true}
          loading={loading}
          value={value}
          // @ts-ignore
          ref={this.wrapperRef}
          onChange={(selectedOptions: $Options) => {
            let valueToSet = _.get(
              selectedOptions[0],
              labelKeyToUse,
            ) as string | void;

            if (onOptionSelect) {
              const onOptionSelectValue: string | void = onOptionSelect(selectedOptions[0]);

              if (onOptionSelectValue) {
                valueToSet = onOptionSelectValue;
              }
            }

            this.setState({
              value: valueToSet,
            });
          }}
          renderInput={({
            inputRef,
            referenceElementRef,
            ...inputProps
          }) => (
            <AvInput
              // eslint-disable-next-line
              {...inputProps} ref={(input) => {
                inputRef(input);
                referenceElementRef(input);
              }}
              placeholder={placeholder}
              autoComplete="off"
              value={value}
              name={name}
              label={label}
              required={required}
            />
          )}
          labelKey={labelKeyToUse}
          onInputChange={async (query: string) => {
            await this.setStateAsync({
              loading: true,
            });

            const foundOptions = await getOptions(query);

            const cleanOptions = foundOptions.filter((
              item: $Option,
            ) => typeof item[labelKeyToUse] === 'string');

            await this.setStateAsync({
              loading: false,
              options: cleanOptions,
            });
          }}
          options={options}
          onSearch={() => {}}
        />
      </FormGroup>
    );
  }
}

export default InputTypeaheadView;
