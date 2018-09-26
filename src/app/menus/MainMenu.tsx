import * as React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export const mainListItems = (actions: any) => (
  <div>
    <ListItem
      button
      onClick={actions.modules}
    >
      <ListItemIcon>
        <ViewModuleIcon />
      </ListItemIcon>
      <ListItemText primary="Модули" />
    </ListItem>
  </div>
);