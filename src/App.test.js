import { render, screen, waitFor, within, act } from '@testing-library/react';
import App from './App';
import {createMockServer} from './mock/createMockServer';
import userEvent from '@testing-library/user-event';
import WeatherCard from './components/WeatherCard';

let server;
beforeEach(() => {
  server = createMockServer();
});

afterEach(() => {
  server.shutdown();
});

describe('Weather Application tests', () => {
  it('renders weather application title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('shows city search results', async () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Melbourne');

    const button = screen.getByTestId('search-button');
    userEvent.click(button);

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5));
  });

  it('shows city search result details', async () => {
    render(<App />);
    
    // Use queryAllByText to find all elements containing "Melbourne"
    const searchResults = screen.queryAllByText(/Melbourne/i);
  
    // Iterate through the search results
    searchResults.forEach((result) => {
      const parent = result.closest('.search-result');
      if (parent) {
        // Verify that the parent element contains latitude and longitude
        expect(within(parent).getByText('-37.8141705, 144.9655616')).toBeInTheDocument();
      }
    });
  });
  
  it('add search result to my weather list', async () => {
    render(<App />);
  
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Melbourne');
  
    const button = screen.getByTestId('search-button');
    userEvent.click(button);
  
    await waitFor(() => {
      expect(screen.getByTestId('search-results')).toBeInTheDocument();
    });
  
    const selected = screen.getAllByText(/Melbourne/i)[3];
    act(() => {
      userEvent.click(selected);
    });
  
    // Wait for the search results to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('search-results')).not.toBeInTheDocument();
    });
  
    expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument();
  });
});

describe('WeatherCard component tests', () => {
  it('renders city name', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city}></WeatherCard>);
    expect(screen.getByText(city.name)).toBeInTheDocument();
  });

  it('renders temperature', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    };
    render(<WeatherCard city={city}></WeatherCard>);
    await waitFor(() => expect(screen.getByText(19.53)).toBeInTheDocument()) ;
  });

  it('renders placeholder when temperature is not available', () => {
    const city = {
      name:'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    }
    render(<WeatherCard city={city}></WeatherCard>);
    expect(screen.getByText('-/-')).toBeInTheDocument();
  });
});