import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import CustomRow from './antd/CustomRow';
import CustomSpace from './antd/CustomSpace';
import CustomInput from './antd/CustomInput';
import { CheckOutlined } from '@ant-design/icons';
import CustomButton from './antd/CustomButton';
import CustomCol from './antd/CustomCol';
import { ConditionalComponent } from '.';
import CustomTitle from './antd/CustomTitle';

interface InputProps {
  placeholder?: string;
  editable?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
  type: 'input' | 'textarea';
}

const InputContainer = styled.div<{ editable?: boolean; placeholder?: string }>`
  border: 1px solid ${({ theme }) => theme.backgroundColor};
  padding: 2px 8px;
  min-height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme, editable }) =>
    editable ? theme.backgroundColor : 'transparent'};

  ${({ theme, editable }) =>
    editable &&
    `
        &:hover {
            border: 1px solid ${theme.primaryColor};
            transition: all 0.9s ease;
        }
    `}

  &:empty:before {
    content: attr(placeholder);
    color: #ccc;
  }
`;

const LabelContainer = styled.div`
  padding: 1px;
  height: max-content;
  align-items: center;
  justify-content: start;

  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;

  .ant-typography {
    margin-bottom: 0.5em !important;
    color: rgba(0, 0, 0, 0.88) !important;
    font-weight: 600 !important;
    font-size: 20px !important;
    line-height: 1.4 !important;
    border: 1px solid red;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.backgroundColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: all 0.9s ease;
  }

  &:empty:before {
    content: attr(placeholder);
    color: #ccc;
  }
`;

const Input = styled.div<InputProps>`
  cursor: ${({ editable }) => (editable ? 'text' : 'pointer')};
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;

  ${({ type }) => {
    switch (type) {
      case 'textarea':
        return 'white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word; min-height: 150px;';
      default:
        // case 'input' set height to 32px and line-height to 32px and the white-space to nowrap
        return 'height: 32px; line-height: 32px; white-space: nowrap; display: flex;justify-content: start;align-items: center;';
    }
  }}

  ${({ level }) => !!level && `font-weight: bold;`}

  ${({ level }) => {
    // cada nivel de text representa una etiqueta html h, por lo que se le asigna un tamaño de fuente
    switch (level) {
      case 1:
        return 'font-size: 2em;';
      case 2:
        return 'font-size: 1.5em;';
      case 3:
        return `margin-bottom: 0.5em;
                color: rgba(0, 0, 0, 0.88);
                font-weight: 600;
                font-size: 20px;
                line-height: 1.4;`;
      case 4:
        return;
      case 5:
        return 'font-size: 0.83em;';
      default:
        return 'font-size: 14px;';
    }
  }}
  &:empty:before {
    content: attr(placeholder);
    color: #ccc;
  }
`;

interface EditableAreaProps {
  editable?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onFinish?(value: string): void;
  onCancel?(): void;
  required?: boolean;
  value?: any;
  level?: 1 | 2 | 3 | 4 | 5;
  placeholder?: string;
  type?: 'input' | 'textarea';
  isEditing?: boolean;
}

const EditableArea: React.FC<EditableAreaProps> = ({
  editable = true,
  onClick,
  onFinish,
  required = false,
  level = 4,
  value,
  type = 'input',
  placeholder = 'Click to edit',
  onCancel,
  isEditing = false,
  ...props
}) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(isEditing);

  const toggleEditing = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleOnFinish = () => {
    try {
      const value = areaRef.current?.textContent || '';

      if (required && !value) {
        return;
      }

      setEditing(false);
      onFinish?.(value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error({ error });
    }
  };

  const HandleOnCancel = () => {
    setEditing(false);
    onCancel?.();
  };

  return (
    <CustomSpace>
      <ConditionalComponent
        condition={editing}
        fallback={
          <LabelContainer placeholder={placeholder} onClick={toggleEditing}>
            <CustomTitle>{value}</CustomTitle>
          </LabelContainer>
        }
      >
        <InputContainer editable={editable} autoFocus>
          <Input
            autoFocus
            onBlur={handleOnFinish}
            ref={areaRef}
            type={type}
            editable={editable}
            contentEditable
            level={level}
            placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: value }}
            {...props}
          />
        </InputContainer>
      </ConditionalComponent>
      <ConditionalComponent condition={editing && type === 'textarea'}>
        <CustomRow justify={'end'} width={'100%'}>
          <CustomSpace direction={'horizontal'} width={'max-content'}>
            <CustomButton onClick={HandleOnCancel}>Cancelar</CustomButton>
            <CustomButton onClick={handleOnFinish} type={'primary'}>
              Guardar
            </CustomButton>
          </CustomSpace>
        </CustomRow>
      </ConditionalComponent>
    </CustomSpace>
  );
};

export default EditableArea;
