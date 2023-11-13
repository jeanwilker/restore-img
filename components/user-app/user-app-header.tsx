'use client';
import { UserNav } from '@/components/common/user-nav';

const UserAppHeader = () => {
  return (
    <header>
      <nav className="flex items-center justify-between m-4">
        <span className="font-extrabold">
          re<span className="font-extralight">Store</span>
        </span>
        <UserNav />
      </nav>
    </header>
  );
};

export default UserAppHeader;
