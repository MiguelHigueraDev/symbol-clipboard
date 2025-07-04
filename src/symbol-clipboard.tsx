import { ActionPanel, List, Action, Icon, LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";
import AddCharacterForm from "./add-character-form";

export type Character = {
  character: string;
};

export default function Command() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    LocalStorage.getItem("characters").then((value) => {
      if (value) {
        setCharacters(JSON.parse(value.toString()));
      }
    });
  }, []);

  const addCharacter = async (character: string) => {
    const newCharacters = [...characters, { character }];
    setCharacters(newCharacters);
    await LocalStorage.setItem("characters", JSON.stringify(newCharacters));
  };

  const removeCharacter = async (character: string) => {
    const newCharacters = characters.filter((c) => c.character !== character);
    setCharacters(newCharacters);
    await LocalStorage.setItem("characters", JSON.stringify(newCharacters));
  };

  return (
    <List>
      <List.Item
        icon={Icon.Plus}
        title="Add new character to clipboard"
        actions={
          <ActionPanel>
            <Action.Push
              title="Show Details"
              target={<AddCharacterForm onCreate={addCharacter} characters={characters} />}
            />
          </ActionPanel>
        }
      />
      {characters.map((character) => (
        <List.Item
          key={character.character}
          title={character.character}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy to Clipboard" content={character.character} />
              <Action icon={Icon.Trash} title="Delete Symbol" onAction={() => removeCharacter(character.character)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
