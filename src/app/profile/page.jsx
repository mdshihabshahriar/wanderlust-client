'use client';

import dynamic from 'next/dynamic';

const ProfileContent = dynamic(() => import('@/components/ProfileContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  ),
});

const ProfilePage = () => {
  return <ProfileContent />;
};

export default ProfilePage;