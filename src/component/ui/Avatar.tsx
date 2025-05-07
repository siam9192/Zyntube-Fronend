interface IProps {
  className?: string;
  url: string;
}
const Avatar = ({ className, url }: IProps) => {
  return (
    <img
      src={url}
      alt=""
      className={className || ' size-10 rounded-full  outline-2 outline-offset-1 outline-primary'}
    />
  );
};

export default Avatar;
