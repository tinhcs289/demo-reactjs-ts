import { CommonTextFieldDebounced } from '@/components/inputs/CommonTextField';
import { CommonTextNumberFieldDebounced } from '@/components/inputs/CommonTextNumberField';
import DateTimeProvider from '@/providers/DateTimeProvider';
import MUIThemeV5Provider from '@/providers/MUIThemeV5Provider';
import { styled, Theme } from '@mui/material';
import Container, { ContainerProps } from '@mui/material/Container';
import Grid, { GridProps } from '@mui/material/Grid';
import React from 'react';
import './App.css';

const FullScreenDiv = styled((props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
})<React.HTMLAttributes<HTMLDivElement>>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    height: `100vh`,
    padding: theme.spacing(2),
  };
});

const ContainerStyled = styled(Container)<ContainerProps>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    //height: `100%`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows['3'],
  };
});

const GridContainerStyled = styled(Grid)<GridProps>((args: { theme: Theme }) => {
  const { theme } = args;
  return {
    padding: theme.spacing(2),
  };
});

const App: React.FC<any> = (props) => {
  const [text1, setText1] = React.useState<string | null | undefined>(null);
  const [number1, setNumber1] = React.useState<number | null | undefined>(null);

  return (
    <DateTimeProvider>
      <MUIThemeV5Provider>
        <FullScreenDiv className="App">
          <ContainerStyled>
            <GridContainerStyled container spacing={2} justifyItems="center">
              <Grid item xs={12}>
                <CommonTextFieldDebounced
                  label="text1"
                  value={text1}
                  onChange={(e) => {
                    setText1(e?.target?.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <CommonTextNumberFieldDebounced
                  label="number1"
                  value={number1}
                  onValueChange={({ floatValue }) => {
                    setNumber1(floatValue);
                  }}
                  isAllowed={(n) => n?.value?.length <= 8}
                />
              </Grid>
            </GridContainerStyled>
          </ContainerStyled>
        </FullScreenDiv>
      </MUIThemeV5Provider>
    </DateTimeProvider>
  );
};
export default App;
