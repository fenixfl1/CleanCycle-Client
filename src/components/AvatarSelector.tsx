import React, { useEffect, useState } from 'react';
import CustomModal from './antd/CustomModal';
import CustomRow from './antd/CustomRow';
import CustomFlex from './antd/CustomFlex';
import CustomAvatar from './antd/CustomAvatar';
import CustomCard from './antd/CustomCard';
import { WEB_API_RANDOM_USER_AVATAR } from '@/constants/routes';
import CustomBadge from './antd/CustomBadge';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { defaultTheme } from '@/themes/themes';

const getAvatar = (index: number) =>
  WEB_API_RANDOM_USER_AVATAR.replace('[index]', `${index}`);

interface AvatarSelectorProps {
  open: boolean;
  onClose?: (close: boolean) => void;
  onSelect?: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  open,
  onSelect,
  onClose,
}) => {
  const [visible, setVisible] = useState(open);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleOnSelect = (index: number) => {
    setSelected(index);
    onSelect?.(getAvatar(index));
  };

  const handleOnClose = () => {
    setVisible(false);
    onClose?.(false);
  };

  return (
    <CustomModal
      open={visible}
      onCancel={handleOnClose}
      width={'450px'}
      centered
      footer={null}
    >
      <CustomFlex wrap={'wrap'} justify={'center'} gap={7}>
        {Array.from({ length: 15 }).map((_, index) => (
          <CustomBadge
            key={index}
            offset={[-5, 5]}
            count={
              selected === index ? (
                <CheckCircleFilled
                  style={{ fontSize: '18px', color: defaultTheme.primaryColor }}
                />
              ) : undefined
            }
          >
            <CustomCard hoverable onClick={() => handleOnSelect(index)}>
              <CustomAvatar
                shadow
                src={getAvatar(index)}
                size={64}
                style={{ margin: '0.5rem' }}
              />
            </CustomCard>
          </CustomBadge>
        ))}
      </CustomFlex>
    </CustomModal>
  );
};

export default AvatarSelector;
