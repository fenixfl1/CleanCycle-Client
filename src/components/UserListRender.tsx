import { User } from '@/redux/slices/userSlice';
import React from 'react';
import CustomList from './antd/CustomList';
import CustomListItem from './antd/CustomListItem';
import CustomButton from './antd/CustomButton';
import CustomListItemMeta from './antd/CustomListItemMeta';
import CustomAvatar from './antd/CustomAvatar';
import ConditionalComponent from './ConditionalComponent';
import { CustomText } from './antd/CustomTypography';
import Link from 'next/link';
import { PATH_USER_PROFILE } from '@/constants/routes';

interface UserListRenderProps {
  dataSource?: User[];
  type: 'followers' | 'following' | 'blocked';
  onUpdate?(followers: User): void;
}

const UserListRender: React.FC<UserListRenderProps> = ({
  dataSource,
  onUpdate,
  type,
}) => {
  const renderItem = (item: User) => {
    // eslint-disable-next-line no-console
    console.log({ item });
    return (
      <CustomListItem
        key={item.USERNAME}
        actions={
          type === 'following' || type === 'blocked'
            ? [
                <CustomButton type={'link'} onClick={() => onUpdate?.(item)}>
                  <ConditionalComponent
                    condition={type === 'following'}
                    fallback={<span>Desbloquear</span>}
                  >
                    <span>Dejar de seguir</span>
                  </ConditionalComponent>
                </CustomButton>,
              ]
            : undefined
        }
      >
        <CustomListItemMeta
          avatar={<CustomAvatar shadow size={32} src={item.AVATAR} />}
          title={
            <Link
              href={PATH_USER_PROFILE}
              as={PATH_USER_PROFILE.replace('[username]', item.USERNAME)}
            >
              {item.FULL_NAME}
            </Link>
          }
          description={
            <CustomText type={'secondary'} decorator="@">
              {item.USERNAME}
            </CustomText>
          }
        />
      </CustomListItem>
    );
  };
  return <CustomList dataSource={dataSource} renderItem={renderItem} />;
};

export default UserListRender;
