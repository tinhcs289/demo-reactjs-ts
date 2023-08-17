import { CommonTypography, H4 } from '@/components/typo';
import Editor from '@monaco-editor/react';
import Grid from '@mui/material/Grid';
const codeExample = `import { ButtonSubmit } from '@/components/buttons';
import { FormGridFields, field, withRHF, withRHFSubmitHandler } from '@/components/form';
import { GridContainer, GridItem } from '@/components/grid';
import withHOCs from '@/hocs/withHocs';
import type { CommonFormProps } from '@/types';
import type { ComponentType } from 'react';
export type FormProps = CommonFormProps<{
  // defined type of form-data hers
}>;
const fields = [
  field({
    //... specified config
  }),
  field({
    //... specified config
  }),
];
function withSubmitButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FormWithSubmitButton(props: any) {
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem>
          <ButtonSubmit>{\`Submit\`}</ButtonSubmit>
        </GridItem>
      </>
    );
  };
}
function withSaveDraftButton(WrappedComponent: ComponentType<any>): ComponentType<any> {
  return function FormWithSubmitButton(props: any) {
    const { dispatchSubmit } = useRHFSubmitDispatch();
    return (
      <>
        <WrappedComponent {...props} />
        <GridItem>
          <button onClick={() => { dispatchSubmit("save_draft") }}>{\`Save Draft\`}</button>
        </GridItem>
      </>
    );
  };
}
const Form = withHOCs(
  withRHF(),
  withRHFSubmitHandler,
  withSubmitButton,
  withSaveDraftButton,
)(function Fields(props: FormProps) {
  return <FormGridFields fields={fields} />;
});
//....
function MyComponent() {
  return (
    <GridContainer>
      <Form />
    </GridContainer>
  );
}
`;
const codeExample2 = `import { FormGridFields, field } from '@/components/form';
import { GridContainer } from '@/components/grid';
const fields = [
  field({
    //... specified config
  }),
  field({
    //... specified config
  }),
];
//....
function MyFormComponent() {
  return (
    <GridContainer>
      <FormGridFields fields={fields} />
    </GridContainer>
  );
}
`;
function Summary() {
  return (
    <>
      <Grid item xs={12} p={1}>
        <H4 id="how-to-create-form">How to create Form Component</H4>
      </Grid>
      <Grid item xs={12} p={1}>
        <CommonTypography paragraph>
          The Form is a component built following the{' '}
          <b>
            <a href="https://mui.com/material-ui/react-grid/">MUI-Grid</a>
          </b>{' '}
          layout, its children are a list of <b>grid-item</b> components and should be wrapped inside a{' '}
          <b>grid-container</b> component.
        </CommonTypography>
        <CommonTypography paragraph>
          Each UI part of in the form or each field data in form values corresponds to a specified component
          wrapped inside a <b>grid-item</b> component.
        </CommonTypography>
        <CommonTypography paragraph>
          <b>GridItem</b> is a customized component base on{' '}
          <b>
            <a href="https://mui.com/material-ui/react-grid/">Grid (grid-item)</a>
          </b>{' '}
          component from <b>'@mui/material/Grid'</b> with the prop <b>item=true</b>.
        </CommonTypography>
        <CommonTypography paragraph>
          <b>GridContainer</b> is a customized component base on{' '}
          <b>
            <a href="https://mui.com/material-ui/react-grid/">Grid (grid-container)</a>
          </b>{' '}
          component from <b>'@mui/material/Grid'</b> with the prop <b>container=true</b>
        </CommonTypography>
      </Grid>
    </>
  );
}
function Composition() {
  return (
    <>
      <Grid item xs={12} p={1}>
        <H4 id="form-composition">Composition</H4>
      </Grid>
      <Grid item xs={12} md={4} p={1}>
        <CommonTypography paragraph>
          Each form's feature or specified business should be implemented separately by the{' '}
          <b>
            <a href="https://legacy.reactjs.org/docs/higher-order-components.html">
              Higher-Order Components (HOC)
            </a>
          </b>{' '}
          pattern then combine them by using the <b>withHOCs</b> function which was exported from{' '}
          <b>'@/hocs/withHOCs'</b>.
        </CommonTypography>
        {/* <CommonTypography paragraph>
          By this way, we can build the form with different developers at the same time and minimize the
          conflicts in the source code between them. The form can extend indefinitely without changing the
          source code of the original component or we can re-use the form with its configuration as a part of
          another form. This is really cool.
        </CommonTypography> */}
        <CommonTypography paragraph>
          Form use{' '}
          <b>
            <a href="https://www.react-hook-form.com/get-started/">react-hook-form</a>
          </b>{' '}
          and the built-in context of react-hook-form to manage form-data. Each form component has its own
          context. we can retrieve form values and state by using{' '}
          <b>
            <a href="https://react-hook-form.com/docs/useformcontext">useFormContext</a>
          </b>{' '}
          hook.
        </CommonTypography>
        <CommonTypography paragraph>
          <b>withRHF()</b>: [REQUIRED] this function will return a HOC, which creates a react-hook-form
          instance and form context. Its order of parameter passing of this HOC must be the higher than the{' '}
          <b>withRHFSubmitHandler</b>
        </CommonTypography>
        <CommonTypography paragraph>
          <b>withRHFSubmitHandler</b>: [REQUIRED] this HOC will register the listener to the submit event, it
          also creates a context for dispatching custom submit events functionally
        </CommonTypography>
        <CommonTypography paragraph>
          <b>Submit the form?</b>: We only need to put a <b>button with type="submit"</b> inside the form,
          then click it. As the example code, we write a HOC name <b>withSubmitButton</b> to append the submit
          button right below the form, we should put the button inside a <b>GridItem</b> component of course.
        </CommonTypography>
        <CommonTypography paragraph>
          <b>Submit the form functionally?</b>: Yes, we can dispatch the submit action functionally by using
          the hook <b>useRHFSubmitDispatch</b> exported from <b>'@/components/form'</b>. The action should be
          included with a specified reason as a string key.
        </CommonTypography>
        <CommonTypography paragraph>
          <b>If I don't want to use field() function?</b>: Yes, you dont need to use <b>field</b> function at
          all. You can create your{' '}
          <b>
            <a href="https://react-hook-form.com/docs/usecontroller/controller#main"> input components</a>
          </b>{' '}
          and put them inside the form. With HOC pattern, you can mix the dynamic fields with the normal input
          components.
        </CommonTypography>
      </Grid>
      <Grid item xs={12} md={8} p={1}>
        <Editor
          height="600px"
          language="typescript"
          theme="vs-dark"
          value={codeExample}
          width="100%"
          options={{
            readOnly: true,
          }}
        />
      </Grid>
    </>
  );
}
function FieldFunction() {
  return (
    <>
      <Grid item xs={12} p={1}>
        <H4 id="field-function">FormGridFields & field</H4>
      </Grid>
      <Grid item xs={12} md={4} p={1}>
        <CommonTypography paragraph>
          The <b>FormGridFields</b> component was exported from <b>'@/components/form'</b>. It is a Fragment
          component. Inside it, the list of <b>grid-item</b> components will be rendered by looping through
          the fields prop.
        </CommonTypography>
        <CommonTypography paragraph>
          Because the form is actually a list of <b>GridItem</b> components, it should be wrapped it inside a{' '}
          <b>GridContainer</b> component.
        </CommonTypography>
        <CommonTypography paragraph>
          For building a form, we have to create an array of field data configurations, then pass it to the
          props <b>fields</b> of the <b>FormGridFields</b> component.
        </CommonTypography>
        <CommonTypography paragraph>
          For creating a specified field data configuration, use the <b>field</b> function exported from{' '}
          <b>'@/components/form'</b>.
        </CommonTypography>
      </Grid>
      <Grid item xs={12} md={8} p={1}>
        <Editor
          height="450px"
          language="typescript"
          theme="vs-dark"
          value={codeExample2}
          width="100%"
          options={{
            readOnly: true,
          }}
        />
      </Grid>
    </>
  );
}
export default function HowToDefinedForm() {
  return (
    <>
      <Summary />
      <FieldFunction />
      <Composition />
    </>
  );
}
