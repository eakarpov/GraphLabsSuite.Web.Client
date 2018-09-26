import {createStyles, Theme} from "@material-ui/core";

export const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
