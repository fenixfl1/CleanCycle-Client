import React from 'react';
import { Button, ButtonProps } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DeliveredProcedureOutlined,
  PlusOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SaveOutlined,
  SearchOutlined,
  StopOutlined,
} from '@ant-design/icons';

export interface CustomButtonProps extends ButtonProps {
  clickPressingKey?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  size = 'middle',
  ...props
}) => {
  const text = props.children?.toString();

  const Icon = () => {
    switch (text) {
      case 'Continuar':
      case 'Siguiente':
      case 'Omitir':
        return <ArrowRightOutlined />;
      case 'Agregar':
        return <PlusOutlined />;
      case 'Anterior':
        return <ArrowLeftOutlined />;
      case 'Guardar y Continuar':
      case 'Actualizar y continuar': {
        return <DeliveredProcedureOutlined />;
      }
      case 'Cargar':
        return <ReloadOutlined />;
      case 'Imprimir': {
        return <PrinterOutlined />;
      }
      case 'Finalizar':
      case 'Asignar':
      case 'Aceptar':
      case 'Actualizar': {
        return <CheckOutlined />;
      }
      case 'Guardar': {
        return <SaveOutlined />;
      }
      case 'No':
      case 'Cancelar': {
        return <StopOutlined />;
      }
      case 'Buscar':
        return <SearchOutlined />;
      case 'Salir': {
        return <CloseOutlined />;
      }
      default:
        if (text?.includes('Agregar')) return <PlusOutlined />;
        if (text?.includes('Imprimir')) return <PrinterOutlined />;
        if (text?.includes('Cargar') || text?.includes('Recargar'))
          return <ReloadOutlined />;
        return null;
    }
  };
  return <Button icon={<Icon />} size={size} {...props}></Button>;
};

export default CustomButton;
