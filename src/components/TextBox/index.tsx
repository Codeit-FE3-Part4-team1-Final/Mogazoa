import { ChangeEvent, useState } from 'react';
import cx from './cx.ts';
import MAX_LENGTH from '@/components/TextBox/constants.ts';

interface Props {
  value?: string;
  placeholder: string;
  errorMessage?: string;
}
export default function TextBox({
  value = '',
  errorMessage = '',
  placeholder,
}: Readonly<Props>) {
  const [text, setText] = useState(value);
  const [inputCount, setInputCount] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target as HTMLTextAreaElement;
    const val = element.value;

    setInputCount(val.length);
    setText(val);
  };

  // textarea에 탭 입력 추가
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setText(`${text}\t`);
    }
  };

  return (
    <div className={cx('container')}>
      <textarea
        className={cx('textArea')}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={MAX_LENGTH}
        value={text}
        placeholder={placeholder}
      />
      <div className={cx('footer')}>
        <div className={cx('error')}>{errorMessage}</div>
        <p className={cx('text-count')}>
          {inputCount} / {MAX_LENGTH}
        </p>
      </div>
    </div>
  );
}
