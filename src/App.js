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
        <a href="https://www.w3.org/TR/wai-aria/#aria-activedescendant">
          <code>aria-activedescendant</code>
        </a>{' '}
        to drive the navigation pattern.
      </p>
      <h1>Steps</h1>
      <ol>
        <li>Start screen reader</li>
        <li>Disable scan mode</li>
        <li>
          Press <kbd>TAB</kbd> to focus to the list below
        </li>
        <li>
          Press <kbd>UP</kbd>/<kbd>DOWN</kbd> arrow keys to navigate across items.
        </li>
        <li>EXPECT: Screen reader should read each of the list item correctly.</li>
      </ol>
      <h1>Try this out</h1>
      <ActiveDescendant ref={activeDescendantRef} />
      <h1>Live View of HTML</h1>
      <OuterHTMLView elementRef={activeDescendantRef} intervalInMS={200} />
      <h1>Test matrix</h1>
      <ul>
        <li>
          Edge + Windows Narrator
          <ul>
            <li>Did not narrate "Return to the Hundred Acre Wood". Seems like a browser bug.</li>
          </ul>
        </li>
        <li>Chrome + NVDA:</li>
        <li>Firefox + NVDA:</li>
        <li>Safari (macOS) + VoiceOver:</li>
        <li>Safari (iPadOS) + VoiceOver:</li>
      </ul>
    </div>
  );
}

export default App;
