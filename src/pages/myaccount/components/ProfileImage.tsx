const ProfileImage = ({
  first_name,
  last_name,
  class_name,
}: {
  first_name: string;
  last_name: string;
  class_name?: string;
}) => {
  const className = class_name
    ? class_name
    : "w-48 h-48 rounded-full flex items-center justify-center bg-red-500 text-white font-bold text-2xl";
  const firstLetter = first_name ? first_name[0].toUpperCase() : "";
  const lastLetter = last_name ? last_name[0].toUpperCase() : "";
  return (
    <div className={className}>
      <span>{lastLetter + firstLetter}</span>
    </div>
  );
};

export default ProfileImage;
