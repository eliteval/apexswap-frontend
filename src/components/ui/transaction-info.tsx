import cn from 'classnames';
interface TransactionInfoTypes {
  label: string;
  value?: string | number;
  className?: string;
}

export default function TransactionInfo({
  label,
  value,
  className,
}: TransactionInfoTypes) {
  return (
    <div
      className={cn(
        'flex items-center justify-between dark:text-gray-300',
        className
      )}
    >
      <span className="font-medium primary-font-family font-size-10">{label}</span>
      <span className="primary-font-family font-size-10">{value ? value : '_ _'}</span>
    </div>
  );
}
