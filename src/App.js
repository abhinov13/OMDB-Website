import './App.css';
import BookmarkedProvider from './Presentation/Context/Bookmarked';
import useScreen from './Presentation/CustomHooks/useScreen';
import useSearchParams from './Presentation/CustomHooks/useSearchParams';
import BookmarkedScreen from './Presentation/Screen/BookmarkedScreen/BookmarkedScreen';
import ErrorScreen from './Presentation/Screen/ErrorScreen/ErrorScreen';
import SearchScreen from './Presentation/Screen/SearchScreen/SearchScreen';

function App() {
  const [screen, navigate] = useScreen();
  const {params} = useSearchParams();

  return (
    <div
      className="App"
      style={{
        background: 'url("./background.jpeg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
      }
    >
      <BookmarkedProvider>
        {
          screen === "bookmarked" ?
            <BookmarkedScreen navigate={navigate} />
            : screen === "search" ?
              <SearchScreen navigate={navigate} params={params} />
              : <ErrorScreen navigate={navigate} />
        }
      </BookmarkedProvider>
    </div>
  );
}

export default App;
