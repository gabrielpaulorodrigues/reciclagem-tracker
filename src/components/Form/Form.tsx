import { useState } from "react";
import { Plus, Scale, DollarSign, Save } from "lucide-react";
import { Dashboard } from "../Dashboard/Dashboard";

interface Material {
    id: number;
    name: string;

    weight: number;
    pricePerKg: number;
}

export function Form() {
    const [materials, setMaterials] = useState<Material[]>([]);

    // Estado para controlar a exibição do formulário de novo material
    const [showMaterialForm, setShowMaterialForm] = useState(false);
    // Estado para armazenar o nome do novo material a ser adicionado
    const [newMaterialName, setNewMaterialName] = useState("");
    // Estado para armazenar o ID do material selecionado no formulário de compra
    const [selectedMaterial, setSelectedMaterial] = useState("");
    // Estado para armazenar o peso do material no formulário de compra
    const [weight, setWeight] = useState("");
    // Estado para armazenar o preço por kg do material no formulário de compra
    const [pricePerKg, setPricePerKg] = useState("");


    // Função para adicionar um novo material
    const addMaterial = (materialName: string) => {
        const newMaterial: Material = { id: materials.length + 1, name: materialName, weight: 0, pricePerKg: 0 };
        setMaterials([...materials, newMaterial]);
    };

    // Handler do formulário de novo material
    const handleNewMaterialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMaterial(newMaterialName);
        setNewMaterialName("");
        setShowMaterialForm(false);
    };


    // Função para lidar com o envio do formulário de compra
    const handlePurchaseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMaterials(materials.map(material => {
            if (material.id === parseInt(selectedMaterial)) {
                const newWeight = material.weight + parseFloat(weight);
                const newPricePerKg = ((material.weight * material.pricePerKg) + (parseFloat(weight) * parseFloat(pricePerKg))) / newWeight;
                return { ...material, weight: newWeight, pricePerKg: newPricePerKg };
            }
            return material;
        }));
        setSelectedMaterial("");
        setWeight("");
        setPricePerKg("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                {/* Cabeçalho com botão para adicionar novo material */}
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">Material Tracker</h1>
                    <button
                        onClick={() => setShowMaterialForm(!showMaterialForm)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Adicionar Novo Material
                    </button>
                </div>

                {/* Formulário para adicionar novo material */}
                {showMaterialForm && (
                    <form onSubmit={handleNewMaterialSubmit} className="mt-6 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Do Material
                                </label>
                                <input
                                    type="text"
                                    value={newMaterialName}
                                    onChange={(e) => setNewMaterialName(e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1.5"
                                    placeholder="Digite o Novo Material"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="self-end bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Adicionar Novo Material
                            </button>
                        </div>
                    </form>
                )}

                {/* Formulário para registrar uma compra */}
                <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Material
                            </label>
                            <select
                                value={selectedMaterial}
                                onChange={(e) => setSelectedMaterial(e.target.value)}
                                className="h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="">Selecione o Material</option>
                                {materials.map((material) => (
                                    <option key={material.id} value={material.id.toString()}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Peso (kg)
                            </label>
                            <div className="relative">
                                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="h-10 pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-padding"
                                    placeholder="Digite o peso em kg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Preço por kg
                            </label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={pricePerKg}
                                    onChange={(e) => setPricePerKg(e.target.value)}
                                    className="h-10 pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-padding"
                                    placeholder="Digite o preço por kg"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                        disabled={!selectedMaterial}
                    >
                        <Save className="h-5 w-5" />
                        Adicionar Compra
                    </button>
                </form>
            </div>

            {/* Dashboard com informações dos materiais */}
            <Dashboard materials={materials} />
        </div>
    );
}