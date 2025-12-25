import { useState, useEffect } from 'react';
import { Users, Search, User, Mail, Building2, Calendar, Copy, CheckCircle, Loader2 } from 'lucide-react';
import { getInstitutionStudents, StudentProfile } from '../utils/supabase';

interface InstitutionStudentsProps {
  institutionAddress: string;
}

export default function InstitutionStudents({ institutionAddress }: InstitutionStudentsProps) {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, [institutionAddress]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getInstitutionStudents(institutionAddress);
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.wallet_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#111] to-black border border-[#1f1f1f] rounded-xl shadow-lg p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
            <Users className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Registered Students</h2>
            <p className="text-sm text-gray-400">View students registered under your institution</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Total Students:</span>
          <span className="font-bold text-yellow-400 text-lg">{students.length}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or wallet address..."
            className="w-full pl-10 pr-4 py-3 bg-black border border-[#1f1f1f] rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-0"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm ? 'No students found' : 'No students registered yet'}
          </h3>
          <p className="text-gray-400">
            {searchTerm
              ? 'Try adjusting your search criteria'
              : 'Students will appear here once they register with your institution'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f] bg-[#111]">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Enrollment Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#111] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-400/10 border border-yellow-400/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{student.full_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-400">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <code className="text-xs font-mono text-gray-300 bg-black border border-[#1f1f1f] px-2 py-1 rounded">
                        {student.wallet_address.slice(0, 10)}...{student.wallet_address.slice(-8)}
                      </code>
                      <button
                        onClick={() => copyToClipboard(student.wallet_address)}
                        className="p-1 hover:bg-[#111] rounded transition-colors"
                        title="Copy wallet address"
                      >
                        {copiedAddress === student.wallet_address ? (
                          <CheckCircle className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {formatDate(student.enrollment_date)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredStudents.length > 0 && (
        <div className="mt-6 pt-6 border-t border-[#1f1f1f]">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              Showing {filteredStudents.length} of {students.length} student{students.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={loadStudents}
              className="text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
