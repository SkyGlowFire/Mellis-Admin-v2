import { useDropzone } from 'react-dropzone';
import React, { FC, useCallback } from 'react';
import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import { MediaFile } from '~/types/image';

const useStyles = makeStyles<
  Theme,
  {
    width: number;
    height: number;
    border: boolean;
    error: boolean;
  }
>((theme) => ({
  root: ({ width, height, border, error }) => ({
    border: border
      ? `1px dotted ${
          !error ? theme.palette.primary.main : theme.palette.error.main
        }`
      : 'none',
    borderRadius: '.5rem',
    height: height,
    width: width,
    minWidth: width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  }),
  dropIcon: {
    flex: 1,
    color: ({ error }) =>
      !error ? theme.palette.primary.main : theme.palette.error.main,
  },
  dropText: {
    color: ({ error }) =>
      !error ? theme.palette.primary.main : theme.palette.error.main,
  },
}));

export interface DropBoxProps {
  actionHandler: (files: MediaFile[]) => void;
  width: number;
  height: number;
  border?: boolean;
  text?: string;
  label?: boolean;
  error?: boolean;
}

const DropBox: FC<DropBoxProps> = (props) => {
  const {
    actionHandler,
    width = 200,
    height = 200,
    border = true,
    text = 'Upload File',
    label = true,
    error = false,
  } = props;
  const classes = useStyles({ width, height, border, error });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.map((file) => {
        return Object.assign(file, { url: URL.createObjectURL(file) });
      });
      if (actionHandler) {
        actionHandler(files);
      } else {
        console.log(files);
      }
    },
    [actionHandler]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <div {...getRootProps({ className: classes.root })}>
        <input {...getInputProps()} />
        {label && (
          <>
            <AddIcon fontSize="large" className={classes.dropIcon} />
            <Typography gutterBottom className={classes.dropText}>
              {text}
            </Typography>
          </>
        )}
      </div>
    </>
  );
};

export default DropBox;
