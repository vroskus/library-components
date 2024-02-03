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
  onChange?: (value: string) => void;
  onOptionSelect?: (option: $Option | void) => (string | void);
  placeholder?: string | void;
  required?: boolean | void;
  value?: null | string | void;
};

type $Props = $OptionalProps & {
  getOptions: (query: string) => Promise<Array<$Option>>;
  name: string;
};

type $State = {
  loading: boolean;
  options: $Options;
  value?: null | string | void;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
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

  wrapperRef: React.RefObject<typeof Typeahead & $Ref>;

  handleClickOutsideBind: (event: Event) => void;

  constructor(props: $Props) {
    super(props);

    this.state = {
      loading: false,
      options: [],
      value: props.value,
    };

    this.wrapperRef = React.createRef<typeof Typeahead & $Ref>();

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
        {label && (
          <Label>
            {label}
          </Label>
        )}
        <AsyncTypeahead
          filterBy={() => true}
          id={name}
          labelKey={labelKeyToUse}
          loading={loading}
          minLength={minLength || 3}
          onChange={(selectedOptions: $Options) => {
            let valueToSet;

            if (selectedOptions.length > 0) {
              valueToSet = _.get(
                selectedOptions[0],
                `${labelKeyToUse}`,
              ) as string | void;

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
          // @ts-ignore
          ref={this.wrapperRef}
          renderInput={({
            inputRef,
            referenceElementRef,
            ...inputProps
          }) => (
            <AvInput
              // eslint-disable-next-line
              {...inputProps} autoComplete="off"
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
