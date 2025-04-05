import { useState } from "react";
import styles from "./styles.module.scss";
import mahjongStore from "../../stores/mahjong";

function LockScreen() {
  const [passcode, setPasscode] = useState(["", "", "", ""]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newPasscode = [...passcode];
    newPasscode[index] = e.target.value.slice(0, 1); // Ensure only one character is entered
    setPasscode(newPasscode);

    mahjongStore.enterSetupPlayersScreen(newPasscode.join(""));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && passcode[index] === "") {
      // Move focus to previous input if current one is empty and Backspace is pressed
      if (index > 0) {
        document.getElementById(`passcode-${index - 1}`)?.focus();
      }
    } else if (e.key !== "Backspace" && passcode[index] !== "") {
      // Move focus to the next input if a valid character is entered
      if (index < passcode.length - 1) {
        document.getElementById(`passcode-${index + 1}`)?.focus();
      }
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <div>TSNH Mahjong</div>
      </div>

      <div className={styles.passcodeContainer}>
        <div className={styles.passcodeInputs}>
          {passcode.map((digit, index) => (
            <input
              key={index}
              id={`passcode-${index}`}
              className={styles.passcodeInput}
              type="text"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LockScreen;
