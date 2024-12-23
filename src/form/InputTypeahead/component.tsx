// Global Types
import type {
  Option,
} from 'availity-reactstrap-validation';

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
  Typeahead,
} from 'react-bootstrap-typeahead';

// Helpers
import _ from 'lodash';

type $Option = Option;

type $OptionalProps = {
  className?: string | void;
  label?: string | void;
  labelKey?: string | void;
  minLength?: number | void;
  onChange?: (value: string) => void;
  onOptionSelect?: (option: Option | void) => (string | void);
  placeholder?: string | void;
  required?: boolean | void;
  value?: null | string | void;
};

type $Options = Array<$Option>;

type $Props = $OptionalProps & {
  getOptions: (query: string) => Promise<Array<$Option>>;
  name: string;
};

// Types
type $Ref = {
  contains: (arg0: Event['target']) => boolean;
  hideMenu: () => void;
};

type $State = {
  loading: boolean;
  options: $Options;
  value?: null | string | void;
};

const defaultMinLength: number = 3;

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
    className: undefined,
    label: undefined,
    labelKey: undefined,
    minLength: undefined,
    onChange: undefined,
    onOptionSelect: undefined,
    placeholder: undefined,
    required: undefined,
    value: undefined,
  };

  wrapperRef: React.RefObject<$Ref & typeof Typeahead | null>;

  handleClickOutsideBind: (event: Event) => void;

  constructor(props: $Props) {
    super(props);

    this.state = {
      loading: false,
      options: [],
      value: props.value,
    };

    this.wrapperRef = React.createRef();

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
      onChange,
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
        {label ? (
          <Label>
            {label}
          </Label>
        ) : null}
        <AsyncTypeahead
          filterBy={() => true}
          id={name}
          labelKey={labelKeyToUse}
          loading={loading}
          minLength={minLength || defaultMinLength}
          onChange={(selectedOptions: $Options) => {
            let valueToSet: string | undefined;

            if (selectedOptions.length) {
              valueToSet = _.get(
                selectedOptions[0],
                `${labelKeyToUse}`,
              ) as string | undefined;

              if (onOptionSelect) {
                const onOptionSelectValue: string | void = onOptionSelect(selectedOptions[0]);

                if (onOptionSelectValue) {
                  valueToSet = onOptionSelectValue;
                }
              }
            }

            this.setState({
              value: valueToSet,
            });
          }}
          onInputChange={async (query: string) => {
            await this.setStateAsync({
              loading: true,
            });

            if (onChange) {
              onChange(query);
            }

            const foundOptions = await getOptions(query);

            const cleanOptions = foundOptions.filter((
              item: $Option,
            ) => typeof item[labelKeyToUse] === 'string');

            await this.setStateAsync({
              loading: false,
              options: cleanOptions,
            });
          }}
          onSearch={() => {}}
          options={options}
          // @ts-expect-error ref
          ref={this.wrapperRef}
          renderInput={({
            inputRef,
            referenceElementRef,
            ...inputProps
          }) => (
            <AvInput
              // eslint-disable-next-line
              {...inputProps}
              autoComplete={'off'}
              label={label}
              name={name}
              placeholder={placeholder}
              ref={(input) => {
                inputRef(input);
                referenceElementRef(input);
              }}
              required={required}
              value={value}
            />
          )}
          useCache={false}
          value={value}
        />
      </FormGroup>
    );
  }
}

export default Component;
