import { Action, ActionPanel, Form, showToast, Toast, useNavigation } from "@raycast/api";
import { Character } from "./symbol-clipboard";

export default function AddCharacterForm(props: { onCreate: (character: string) => void; characters: Character[] }) {
  const { pop } = useNavigation();
  const handleSubmit = (values: { character: string }) => {
    if (props.characters.some((c) => c.character === values.character)) {
      showToast({
        title: "Character already exists",
        message: "Please enter a different character",
        style: Toast.Style.Failure,
      });
      return;
    }
    props.onCreate(values.character);
    pop();
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Character" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="character" title="Character" autoFocus={true} />
    </Form>
  );
}
