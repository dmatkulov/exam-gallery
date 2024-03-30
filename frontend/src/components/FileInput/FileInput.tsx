import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  getFieldError: (name: string) => string | undefined;
}

const FileInput: React.FC<Props> = ({
  onChange,
  name,
  label,
  getFieldError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            fullWidth
            disabled
            label={label}
            value={filename}
            error={Boolean(getFieldError('image'))}
            helperText={getFieldError('image')}
            onClick={activateInput}
            size="small"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
