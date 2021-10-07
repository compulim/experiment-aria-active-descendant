import { useRef } from 'react';
import './App.css';

import ActiveDescendant from './ui/ActiveDescendant';
import OuterHTMLView from './ui/OuterHTMLView';

function App() {
  const activeDescendantRef = useRef();

  return (
    <div className="App">
      <h1>Background</h1>
      <p>
        We are using{' '}
        <a href="https://www.w3.org/TR/wai-aria/#aria-activedescendant" rel="noopener noreferrer" target="_blank">
          <code>aria-activedescendant</code>
        </a>{' '}
        to drive the navigation pattern.
      </p>
      <h1>Steps</h1>
      <ol>
        <li>Start screen reader.</li>
        <li>
          Press <kbd>TAB</kbd> to focus to the list below, should see a solid black border.
        </li>
        <li>
          Disable scan mode by pressing <kbd>CAPS</kbd> + <kbd>SPACE</kbd> (higher pitch sound in NVDA indicate scan
          mode is disabled).
          <ul>
            <li>Apple VoiceOver do not have scan mode.</li>
          </ul>
        </li>
        <li>
          Press <kbd>UP</kbd>/<kbd>DOWN</kbd> arrow keys to navigate across items, should see both solid and dashed
          border.
        </li>
      </ol>
      <p>
        <strong>EXPECT</strong>: When using arrow keys to navigate, screen reader should read each of the list item
        correctly.
      </p>
      <h1>Try this out</h1>
      <ActiveDescendant ref={activeDescendantRef} />
      <h1>Live View of HTML</h1>
      <OuterHTMLView elementRef={activeDescendantRef} intervalInMS={200} />
      <h1>Test matrix</h1>
      <ul>
        <li>
          Edge + Windows Narrator
          <ul>
            <li>✔️ Do narrate content on arrow keys (when active descendant change).</li>
            <li>
              ❌ Do not narrate "Return to the Hundred Acre Wood". It narrate "An authorised sequel was published on
              ...". Seems like a browser bug.
            </li>
          </ul>
        </li>
        <li>
          Chrome + NVDA:
          <ul>
            <li>❌ Do not narrate content on arrow keys (when active descendant change), only narrate "1 of 5".</li>
            <li>
              ❌ Do not narrate "Return to the Hundred Acre Wood". It narrate "An authorised sequel was published on
              ...". Seems like a browser bug.
            </li>
          </ul>
        </li>
        <li>
          Firefox + NVDA:
          <ul>
            <li>✔️ Do narrate content on arrow keys (when active descendant change).</li>
            <li>✔️ Do narrate "Return to the Hundred Acre Wood".</li>
            <li>
              ❌ Do not narrate "link" (accessible name) for "Return to the Hundred Acre Wood", treated as plain text.
            </li>
          </ul>
        </li>
        <li>
          Safari (macOS) + VoiceOver:
          <ul>
            <li>✔️ Do narrate SOME content on arrow keys: "An authorised sequel and 2 more items."</li>
            <li>
              ✔️ Do narrate "link" (accessible name) when pressing <kbd>CAPS</kbd> + <kbd>RIGHT</kbd>: "link, Return to
              the Hundred Acre Wood".
            </li>
          </ul>
        </li>
        <li>
          Safari (iPadOS) + VoiceOver:
          <ul>
            <li>✔️ Do narrate content on two-finger swipe down.</li>
            <li>✔️ Do narrate "link" (accessible name): "... sequel Return to the Hundred Acre Wood, link, was ..."</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
