'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameCard from '@/app/components/GameCard';
import { Game } from '@/lib/types';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState([]);
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');

  const fetchGames = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/games?genre=${genre || ''}&page=${page}`
      );
      const data = await response.json();

      setGames(prev => (page === 1 ? data.games : [...prev, ...data.games]));
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setFilters(data.availableFilters);

    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  }, [genre, page]);

  useEffect(() => {
    const url = new URL(window.location.href);
    setPage(1);
    setGames([]);
    setLoading(true);
    fetchGames();
    url.searchParams.set('page', (1).toString());
    window.history.pushState({}, '', url);
  }, [genre, fetchGames]);

  useEffect(() => {
    if (page > 1) {
      fetchGames();
    }
  }, [page, fetchGames]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    if (e.target.value) {
      url.searchParams.set('genre', e.target.value);
    } else {
      url.searchParams.delete('genre');
    }
    url.searchParams.delete('page');
    window.history.pushState({}, '', url);
    setPage(1);
    setGames([]);
    setLoading(true);
    fetchGames();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between flex-col">
          <div className="flex justify-start w-full">
            <h1 className="text-2xl font-bold text-custom-text-color">Top Sellers</h1>
          </div>
          <div className="flex justify-end w-full items-center">
            <span className="text-custom-text-color mr-3">Genre</span>
            <select
              className="rounded-md border p-2"
              value={genre || ''}
              onChange={(e) => onChangeSelect(e)}
            >
              <option value="">All</option>
              {filters &&
                filters.map((filter, index) => (
                  <option key={`${filter}-${index}`} value={`${filter}`}>{filter}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      {currentPage !== totalPages && (
        <div className="mb-3 pl-6 flex justify-start">
          <button
            onClick={(e) => {
              const url = new URL(window.location.href);
              setPage((p) => p + 1);
              url.searchParams.set('page', (page + 1).toString());
              window.history.pushState({}, '', url);
            }}
            className="rounded bg-special-gray px-6 py-2 text-white hover:bg-gray-700"
          >
            See More
          </button>
        </div>
      )}
    </>
  );
}