const ProfileImage = ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  const firstLetter = first_name ? first_name[0].toUpperCase() : "";
  const lastLetter = last_name ? last_name[0].toUpperCase() : "";
  return (
    <div className="w-48 h-48 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-2xl">
      <span>{lastLetter + firstLetter}</span>
    </div>
  );
};

export default ProfileImage;
