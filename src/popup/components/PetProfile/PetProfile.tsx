// src/popup/components/PetProfile/PetProfile.tsx

import React, { useState, useEffect } from 'react';
import './PetProfile.css';

interface PetProfileProps {
  petId?: string;         // Optional for new pet
  onSave: (pet: Pet) => void;
  onCancel: () => void;
}

const PetProfile: React.FC<PetProfileProps> = ({ petId, onSave, onCancel }) => {
  const [pet, setPet] = useState<Pet>({
    id: '',
    name: '',
    species: '',
    breed: '',
    birthDate: new Date(),
    weight: { value: 0, unit: 'kg', history: [] },
    photos: { primary: '', gallery: [] },
    healthConditions: [],
    medications: [],
    vaccinations: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (petId) {
      loadPet();
    } else {
      setLoading(false);
    }
  }, [petId]);

  const loadPet = async () => {
    try {
      const loadedPet = await PetProfileStorage.get(petId as string);
      setPet(loadedPet);
      setLoading(false);
    } catch (error) {
      setError('Error loading pet profile');
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        if (petId) {
          await PetProfileStorage.update(petId, pet);
        } else {
          await PetProfileStorage.create(pet);
        }
        onSave(pet);
      } catch (error) {
        setError('Error saving pet profile');
      }
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPet((prevPet) => ({
          ...prevPet,
          photos: { ...prevPet.photos, primary: e.target?.result as string }
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const validateForm = (): boolean => {
    // Add form validation logic here
    return true;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pet-profile">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={pet.name}
            onChange={(e) => setPet({ ...pet, name: e.target.value })}
            required
          />
        </label>
        <label>
          Species:
          <input
            type="text"
            value={pet.species}
            onChange={(e) => setPet({ ...pet, species: e.target.value })}
            required
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            value={pet.breed}
            onChange={(e) => setPet({ ...pet, breed: e.target.value })}
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            value={pet.birthDate.toISOString().split('T')[0]}
            onChange={(e) => setPet({ ...pet, birthDate: new Date(e.target.value) })}
            required
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={pet.weight.value}
            onChange={(e) => setPet({ ...pet, weight: { ...pet.weight, value: Number(e.target.value) } })}
            required
          />
          <select
            value={pet.weight.unit}
            onChange={(e) => setPet({ ...pet, weight: { ...pet.weight, unit: e.target.value as 'kg' | 'lbs' } })}
          >
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </label>
        <label>
          Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          {pet.photos.primary && <img src={pet.photos.primary} alt="Pet" />}
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default PetProfile;
