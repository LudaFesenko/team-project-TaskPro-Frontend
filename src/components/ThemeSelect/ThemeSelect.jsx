import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { setTheme } from '../../redux/theme/theme-slice';
import {
  StyledSelectWrapper,
  StyledList,
  StyledItem,
  StyledTitle,
} from './ThemeSelect.styled';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Violet', value: 'violet' },
];

const ThemeSelect = () => {
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  const toggleTheme = theme => {
    dispatch(setTheme(theme));
    setSelectedTheme(theme);
    setIsThemeOpen(false);
  };

  return (
    <div>
      <StyledSelectWrapper onClick={() => setIsThemeOpen(!isThemeOpen)}>
        <StyledTitle>Theme</StyledTitle>
        <MdOutlineKeyboardArrowDown size={16} color="var(--themeText)" />
      </StyledSelectWrapper>
      <StyledList isOpen={isThemeOpen}>
        {themes.map(({ value, name }) => (
          <StyledItem key={value} onClick={() => toggleTheme(value)}>
            {name}
          </StyledItem>
        ))}
      </StyledList>
    </div>
  );
};

export default ThemeSelect;
