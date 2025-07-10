import useFormStore from "./Store7";
import { useState } from "react";
import { Plus, Trash2, Settings, Sparkles, Eye, Code } from "lucide-react";

const FormB = () => {
    interface NewField {
        id: string;
        type: 'text' | 'number' | 'password' | 'date' | 'file' | 'textarea' | 'select' | 'checkbox' | 'radio';
        label: string;
        placeholder?: string;
        options?: string[];
        required?: boolean;
        value?: string | number | boolean | string[];
    }
    
    const {
        formfields, addField, removeField, updateField, resetFromFields
    } = useFormStore();

    const [newfield, setNewField] = useState<NewField>({
        id: '',
        type: 'text',
        label: '',
        placeholder: '',
        options: [],
        required: false,
        value: ''
    });

    const [previewMode, setPreviewMode] = useState(false);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewField((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setNewField((prev) => ({
            ...prev,
            type: value as NewField['type']
        }));
    };

    const handleAtField = () => {
        if (newfield.label.trim() === '') {
            alert('Field label is required');
            return;
        }
        const fieldWithId = { ...newfield, id: Date.now().toString() };
        addField(fieldWithId);
        setNewField({
            id: '',
            type: 'text',
            label: '',
            placeholder: '',
            options: [],
            required: false,
            value: ''
        });
    };

    const resetFrom = () => {
        resetFromFields();
        setNewField({
            id: '',
            type: 'text',
            label: '',
            placeholder: '',
            options: [],
            required: false,
            value: ''
        });
    };

    const fieldTypeOptions = [
        { value: 'text', label: 'Text Input', icon: '📝' },
        { value: 'number', label: 'Number', icon: '🔢' },
        { value: 'password', label: 'Password', icon: '🔒' },
        { value: 'date', label: 'Date', icon: '📅' },
        { value: 'file', label: 'File Upload', icon: '📁' },
        { value: 'textarea', label: 'Text Area', icon: '📄' },
        { value: 'select', label: 'Dropdown', icon: '📋' },
        { value: 'checkbox', label: 'Checkbox', icon: '☑️' },
        { value: 'radio', label: 'Radio Button', icon: '🔘' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Advanced Form Builder
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Create beautiful, interactive forms with our drag-and-drop builder. Design, customize, and deploy in minutes.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Builder Panel */}
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Settings className="w-6 h-6 text-indigo-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Field Configuration</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Field Label
                                    </label>
                                    <input 
                                        type="text" 
                                        name="label" 
                                        placeholder="Enter field label..." 
                                        value={newfield.label} 
                                        onChange={handleFieldChange} 
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-indigo-300"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Field Type
                                    </label>
                                    <select 
                                        name="type" 
                                        value={newfield.type} 
                                        onChange={handleChange}  
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-indigo-300"
                                    >
                                        {fieldTypeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.icon} {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Placeholder Text
                                    </label>
                                    <input 
                                        type="text" 
                                        name="placeholder" 
                                        placeholder="Enter placeholder text..." 
                                        value={newfield.placeholder || ''} 
                                        onChange={handleFieldChange} 
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-indigo-300"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        type="button" 
                                        onClick={handleAtField} 
                                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Field
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={resetFrom} 
                                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        Reset Form
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium">Total Fields</p>
                                    <p className="text-3xl font-bold">{formfields.length}</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <Code className="w-8 h-8" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Preview Panel */}
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Eye className="w-6 h-6 text-indigo-600" />
                                    <h2 className="text-2xl font-bold text-gray-800">Form Preview</h2>
                                </div>
                                <button
                                    onClick={() => setPreviewMode(!previewMode)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        previewMode 
                                            ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                                </button>
                            </div>
                            
                            {formfields.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <Settings className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-500 mb-2">No fields added yet</h3>
                                    <p className="text-gray-400">Start building your form by adding fields from the left panel</p>
                                </div>
                            ) : (
                                <form className="space-y-6 max-h-96 overflow-y-auto pr-2">
                                    {formfields.map((field, index) => (
                                        <div 
                                            key={field.id} 
                                            className="group bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 rounded-xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <label className="block text-lg font-semibold text-gray-800">
                                                        {field.label}
                                                    </label>
                                                </div>
                                                {!previewMode && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeField(field.id)}
                                                        className="opacity-0 group-hover:opacity-100 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {field.type === 'text' || field.type === 'number' || field.type === 'password' ? (
                                                <input
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={field.value as string}
                                                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                />
                                            ) : field.type === 'textarea' ? (
                                                <textarea
                                                    placeholder={field.placeholder}
                                                    value={field.value as string}
                                                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                                                    rows={4}
                                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none"
                                                />
                                            ) : field.type === 'select' ? (
                                                <select
                                                    value={field.value as string}
                                                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                >
                                                    <option value="">Select an option...</option>
                                                    {field.options?.map((option, index) => (
                                                        <option key={index} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            ) : field.type === 'checkbox' ? (
                                                <label className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value as boolean}
                                                        onChange={(e) => updateField(field.id, { value: e.target.checked })}
                                                        className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                                    />
                                                    <span className="text-gray-700 font-medium">Check this option</span>
                                                </label>
                                            ) : field.type === 'date' ? (
                                                <input
                                                    type="date"
                                                    value={field.value as string}
                                                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                                                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                                />
                                            ) : field.type === 'file' ? (
                                                <input
                                                    type="file"
                                                    onChange={(e) => updateField(field.id, { value: e.target.files?.[0]?.name || '' })}
                                                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-indigo-300"
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </form>
                            )}
                        </div>

                        {formfields.length > 0 && (
                            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg">
                                Submit Form
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormB;