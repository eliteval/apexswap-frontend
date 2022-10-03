import cn from 'classnames';
interface RoutesTypes {
  route: object;
  swap?: object;
}

export default function Routes({
  route,
  swap,
  className,
}: RoutesTypes) {
  return (
    <div
      className={cn(
        'flex items-center justify-between dark:text-gray-300')}
    >
      <span className="font-medium primary-font-family font-size-10">{label}</span>
      <span className="primary-font-family font-size-10">{value ? value : '_ _'}</span>
    </div>
  );
}
