import React, { createContext, useContext, ReactNode, Component } from 'react';
import { ThemeType } from './ThemeType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BRANDING_RESPONSE_FILE } from '../constants/Constant';
import { defaultTheme } from './AppTheme';

// Create a context object
export const ThemeContext = createContext<ThemeType | undefined>(undefined);

function mergeBrandingDefaults(theme: ThemeType): ThemeType {
  const defaultBody = defaultTheme.v3?.body;
  const defaultTs = defaultBody?.time_stamp;
  const defaultIcon = defaultBody?.icon;
  if (!theme?.v3?.body || !defaultBody) {
    return theme;
  }
  const body = theme.v3.body;
  return {
    ...theme,
    v3: {
      ...theme.v3,
      body: {
        ...defaultBody,
        ...body,
        time_stamp: {
          ...(defaultTs || {}),
          ...(body.time_stamp || {}),
        },
        icon: {
          ...(defaultIcon || {}),
          ...(body.icon || {}),
        },
      },
    },
  };
}

export class ThemeProvider extends Component<{
  children: ReactNode;
  theme?: ThemeType | null;
}> {
  state = {
    theme: defaultTheme,
  };

  componentDidMount() {
    this.fetchThemeFromDB();
  }

  private fetchThemeFromDB = async () => {
    try {
      AsyncStorage.getItem(BRANDING_RESPONSE_FILE, (error, result) => {
        if (result) {
          const savedTheme = JSON.parse(result);
          this.setState({ theme: savedTheme });
        }
      });
    } catch {}
  };

  render() {
    const fromProps = this.props.theme;
    const raw = fromProps?.v3 != null ? fromProps : this.state.theme;
    const resolvedTheme = mergeBrandingDefaults(raw);
    return (
      <ThemeContext.Provider value={resolvedTheme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

// Custom hook to consume the theme
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};
