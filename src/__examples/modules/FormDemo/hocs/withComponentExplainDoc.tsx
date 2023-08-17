import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useMemo, type ComponentType } from 'react';
import Editor from '@monaco-editor/react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { useRHFWatchValue } from '@/hooks/useRHF';
export default function withComponentExplainDoc(params?: { codeExample?: string; fieldName: string }) {
  return function withComponentExplainDocHoc(WrappedComponent: ComponentType<any>): ComponentType<any> {
    return function GridItemWithDocExplain(props: any) {
      const { children, sx, ...otherProps } = props;
      const value = useRHFWatchValue(params?.fieldName as any);
      const $Value = useMemo(() => <JsonView collapseObjectsAfterLength={2} src={{ value }} />, [value]);
      const $Code = useMemo(
        () => (
          <Editor
            height="200px"
            language="typescript"
            theme="vs-dark"
            value={params?.codeExample || ''}
            width="100%"
            options={{
              readOnly: true,
            }}
          />
        ),
        []
      );
      return (
        <Grid item xs={12} container alignItems="flex-start" {...(sx as any)}>
          <WrappedComponent {...otherProps} xs={12} md={4} mb={2}>
            {children}
          </WrappedComponent>
          <Grid item xs={12} lg={6} pl={1}>
            {$Code}
          </Grid>
          <Grid item xs={12} lg={2} pl={1}>
            {$Value}
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider sx={{ borderColor: (t) => t?.palette?.divider }} />
          </Grid>
        </Grid>
      );
    };
  };
}
