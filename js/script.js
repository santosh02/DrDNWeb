///  <reference path="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js" />
var app=angular
		.module("myModule",['ui.bootstrap'])
		.filter('groupBy', function () {
  var results={};
    return function (data, key) {
        if (!(data && key)) return;
        var result;
        if(!this.$id){
            result={};
        }else{
            var scopeId = this.$id;
            if(!results[scopeId]){
                results[scopeId]={};
                this.$on("$destroy", function() {
                    delete results[scopeId];
                });
            }
            result = results[scopeId];
        }

        for(var groupKey in result)
          result[groupKey].splice(0,result[groupKey].length);

        for (var i=0; i<data.length; i++) {
            if (!result[data[i][key]])
                result[data[i][key]]=[];
            result[data[i][key]].push(data[i]);
        }

        var keys = Object.keys(result);
        for(var k=0; k<keys.length; k++){
          if(result[keys[k]].length===0)
            delete result[keys[k]];
        }
        return result;
    };
})
		.controller("myController",function($scope , $http, $filter){
			$scope.papers = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 2;
  
  
  $scope.$watch('currentPage + numPerPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.paperslist = $scope.papers.slice(begin, end);
  });

			$scope.papers=[]/*[
					{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
					{
						"year":2016,
						"authors":"Restore Truncation for Performance Improvement in Future DRAM Systems",
						"title":"Xianwei Zhang† Youtao Zhang† Bruce R. Childers† Jun Yang‡",
						"details":"978-1-4673-9211-2/16/$31.00 ©2016 IEEE"},
						{
						"year":2016,
						"authors":"Pramod Kumar Meher, Senior Member, IEEE",
						"title":"On Efficient Retiming of Fixed-Point Circuits",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 24, NO. 4, APRIL 2016"},
						{
						"year":2016,
						"authors":"Reza Zendegani, Mehdi Kamal, Milad Bahadori, Ali Afzali-Kusha, and Massoud Pedram",
						"title":"RoBA Multiplier: A Rounding-Based Approximate Multiplier for High-Speed yet Energy-Efficient Digital Signal Processing",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS"},
						{
						"year":2016,
						"authors":"Yongfei Zhang , Haiheng Cao, Hongxu Jiang, Bo Li ",
						"title":"Memory-efficient high-speed VLSI implementation of multi-level discrete wavelet transform",
						"details":"Beijing Key Laboratory of Digital Media, School of Computer Science and Engineering, Beihang University, Beijing 100191, China State Key Laboratory of Virtual Reality Technology and Systems, Beihang University, Beijing 100191, China"},
						{
						"year":2016,
						"authors":"J. N. Coleman and R. Che Ismail, Senior Member, IEEE",
						"title":"LNS with Co-Transformation Competes with Floating-Point",
						"details":"IEEE TRANSACTIONS ON COMPUTERS, VOL. 65, NO. 1, JANUARY 2016"},
						{
						"year":2016,
						"authors":"Javier Hormigo, and Julio Villalba, Member, IEEE",
						"title":"HUB-Floating-Point for improving FPGAimplementations of DSP Applications",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS–II: EXPRESS BRIEFS, , VOL. 99, NO. 9, APRIL 2016"},
						{
						"year":2016,
						"authors":"Youri Popoff., Florian Scheidegger., Michael Schaffner., Michael Gautschi., Frank K. G urkaynak., Luca Benini",
						"title":"High-Efficiency Logarithmic Number Unit Design based on an Improved Cotransformation Scheme",
						"details":"ETH Z¨urich, 8092 Z¨urich, Switzerland, Universit`a di Bologna, Italy978-3-9815370-7-9/DATE16 2016 EDAA"},
						{
						"year":2016,
						"authors":"Basant Kumar Mohanty, Gaurav Singh , Ganapati Panda ",
						"title":"Hardware Design for VLSI Implementation of FxLMS- and FsLMS-Based Active Noise Controllers",
						"details":"Circuits Syst Signal ProcessDOI 10.1007/s00034-016-0311-x"},
						{
						"year":2016,
						"authors":"Olivier Féron, François Orieux, and Jean-François Giovannelli",
						"title":"Gradient Scan Gibbs Sampler: An Efficient Algorithm for High-Dimensional Gaussian Distributions",
						"details":"IEEE JOURNAL OF SELECTED TOPICS IN SIGNAL PROCESSING, VOL. 10, NO. 2, MARCH 2016"},
						{
						"year":2016,
						"authors":"Amir Kaivani and Seokbum Ko",
						"title":"Floating-Point Butterfly Architecture Based on Binary Signed-Digit Representation",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 24, NO. 3, MARCH 2016"},
						{
						"year":2016,
						"authors":"Georgios Zervakis, Kostas Tsoumanis, Student Member, IEEE, Sotirios Xydis, Dimitrios Soudris, and Kiamal Pekmestzi",
						"title":"Design-Efficient Approximate Multiplication Circuits Through Partial Product Perforation",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS"},
						{
						"year":2016,
						"authors":"Julio de Oliveira, Leonardo Soares, Eduardo Costa, 2Sergio Bampi",
						"title":"Exploiting Approximate Adder Circuits for Power-Efficient Gaussian and Gradient Filters for Canny Edge Detector Algorithm",
						"details":"VII Latin American Symposium on Circuits and Systems (LASCAS) 2016"},
						{
						"year":2016,
						"authors":"Mansi Jhamb, Garima *, Himanshu Lohani",
						"title":"Design, implementation and performance comparison of multiplier topologies in power-delay space",
						"details":"Engineering Science and Technology, an International Journal 19 (2016) 355–363"},
						{
						"year":2016,
						"authors":"Aravind Illa, Nisha Haridas *, Elizabeth Elias",
						"title":"Design of Multiplier-less FIR filters with Simultaneously Variable Bandwidth and Fractional Delay",
						"details":"Engineering Science and Technology, an International Journal 19 (2016) 1160–1165"},
						{
						"year":2016,
						"authors":"Abhijit Chandra ,*, Sudipta Chattopadhyay ",
						"title":"Design of hardware efficient FIR filter: A review of the state-of-the-art approaches",
						"details":"Engineering Science and Technology, an International Journal 19 (2016) 212–226"},
						{
						"year":2016,
						"authors":"Rahul Shrestha§, Member, IEEE and Utkarsh Rastogi",
						"title":"Design and Implementation of Area-Efficient and Low-Power Configurable Booth-Multiplier",
						"details":"2016 29th International Conference on VLSI Design and 2016 15th International Conference on Embedded Systems"},
						{
						"year":2016,
						"authors":"Abubakr O. Al-Abbasi, Ridha Hamila, Waheed U. Bajwa, and Naofal Al-Dhahir",
						"title":"Design and Analysis Framework for Sparse FIR Channel Shortening",
						"details":"IEEE ICC 2016 - Signal Processing for Communications Symposium"},
						{
						"year":2016,
						"authors":"Jaejoon Choi, Jaehwan Jung, Student Member, IEEE, and In-Cheol Park, Senior Member, IEEE",
						"title":"Area-Efficient Approach for Generating Quantized Gaussian Noise",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—I: REGULAR PAPERS, VOL. 63, NO. 7, JULY 2016"},
						{
						"year":2016,
						"authors":"Honglan Jiang, Student Member, IEEE, Jie Han, Member, IEEE, Fei Qiao, and Fabrizio Lombardi, Fellow, IEEE",
						"title":"Approximate Radix-8 Booth Multipliers for Low-Power and High-Performance Operation",
						"details":"IEEE TRANSACTIONS ON COMPUTERS, VOL. 65, NO. 8, AUGUST 2016"},
						{
						"year":2016,
						"authors":"Fu-Jhong Yang*, Pei-Yin Chen, Member, IEEE, Chih-Ling Hsu ,Chih-Yuan Lien",
						"title":"An Efficient Quadtree-based Block Truncation Coding for Digital Image Compression",
						"details":"2016 30th International Conference on Advanced Information Networking and Applications Workshops"},
						{
						"year":2016,
						"authors":"Basant Kumar Mohanty , Pramod Kumar Meher , Subodh Kumar Singhal , M.N.S. Swamy ",
						"title":"A high-performanceVLSIarchitectureforreconfigurableFIR using distributedarithmetic",
						"details":"INTEGRATION,theVLSIjournal54(2016)37–46"},
						{
						"year":2016,
						"authors":"S.Suvarna, K. Rajesh, T. Radhu",
						"title":"A Modified Architecture for Radix-4 Booth Multiplier with Adaptive Hold Logic",
						"details":"International Journal of Students’ Research In Technology & Management Vol 4 (1) Jan-Feb 2016, pg 01-05 eISSN 2321-2543, doi: 10.18510/ijsrtm.2016.411"},
						{
						"year":2015,
						"authors":"Gian Domenico Licciardo, Member, IEEE, Carmine Cappetta, Student Member, IEEE, Luigi Di Benedetto, Member, IEEE and Mario Vigliar",
						"title":"Weighted Partitioning for Fast Multiplier-less Multiple Constant Convolution Circuit",
						"details":"Citation information: DOI 10.1109/TCSII.2016.2546899, IEEE Transactions on Circuits and Systems II: Express Briefs"},
						{
						"year":2015,
						"authors":"Massimo Alioto, Senior Member, IEEE, Elio Consoli, and Gaetano Palumbo, Fellow, IEEE",
						"title":"Variations in Nanometer CMOS Flip-Flops: Part I—Impact of Process Variations on Timing",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—I: REGULAR PAPERS"},
						{
						"year":2015,
						"authors":"Massimo Alioto, Senior Member, IEEE, Elio Consoli, and Gaetano Palumbo, Fellow, IEEE",
						"title":"Variations in Nanometer CMOS Flip-Flops: Part II—Energy Variability and Impact of Other Sources of Variations",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—I: REGULAR PAPERS"},
						{
						"year":2015,
						"authors":"Joshua Yung Lih Low, Student Member, IEEE and Ching Chuen Jong, Member, IEEE",
						"title":"Unified Mitchell-Based Approximation for Efficient Logarithmic Conversion Circuit",
						"details":"IEEE TRANSACTIONS ON COMPUTERS, VOL. 64, NO. 6, JUNE 2015"},
						{
						"year":2015,
						"authors":"Sumod Abraham Sukhmeet Kaur Shivani Singh",
						"title":"Study of Various High Speed Multipliers",
						"details":"2015 International Conference on Computer Communication and Informatics (ICCCI -2015), Jan. 08 – 10, 2015, Coimbatore, INDIA"},
						{
						"year":2015,
						"authors":"Arindam Banerjee, Debesh Kumar Das",
						"title":"Squarer Design with Reduced Area and Delay",
						"details":"978-1-4799-1743-3/15/31.00 2015 IEEE"},
						{
						"year":2015,
						"authors":"Pramod Kumar Meher1",
						"title":"Seamless Pipelining of DSP Circuits",
						"details":"Circuits Syst Signal Process DOI 10.1007/s00034-015-0089-2"},
						{
						"year":2015,
						"authors":"I-Chyn Wey, Chien-Chang Peng, and Feng-Yu Liao",
						"title":"Reliable Low-Power Multiplier Design Using Fixed-Width Replica Redundancy Block",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 23, NO. 1, JANUARY 2015"},
						{
						"year":2015,
						"authors":"Srikanth Immareddy, Sravan Kumar Talusani, Rayavarapu Prasad Rao",
						"title":"Recursive Approach to the Design of a Parallel Self-Timed Adder",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 23, NO. 1, JANUARY 2015"},
						{
						"year":2015,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Realization of FIR Filter using High Speed, Low Power Floating Point Arithmetic Unit",
						"details":"978-1-479-7678- 2/15/$31.0 ©2015 IEEE"},
						{
						"year":2015,
						"authors":"Manuel de la Guia Solaz and Richard Conway",
						"title":"Razor Based Programmable Truncated Multiply and Accumulate, Energy-Reduction for Efficient Digital Signal Processing",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 23, NO. 1, JANUARY 2015"},
						{
						"year":2015,
						"authors":"Partha Bhattacharyya, Senior Member, IEEE, Bijoy Kundu, Sovan Ghosh, Vinay Kumar, Member, IEEE,and Anup Dandapat, Member, IEEE",
						"title":"Performance Analysis of a Low-Power High-Speed Hybrid 1-bit Full Adder Circuit",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS, VOL. 23, NO. 10, OCTOBER 2015"},
						{
						"year":2015,
						"authors":"Liyaqat Nazir, Roohie Naaz Mir",
						"title":"Performance Analysis of Various scheduling algorithms using FPGA Platforms.",
						"details":"2015 International Conference on VLSI Systems, Architecture, Technology and Applications (VLSI-SATA)"},
						{
						"year":2015,
						"authors":"Sajib Kumar Mitra and Ahsan Raja Chowdhury",
						"title":"Optimized Logarithmic Barrel Shifter in Reversible Logic Synthesis",
						"details":"2015 28th International Conference on VLSI Design and 2015 14th International Conference on Embedded Systems"},
						{
						"year":2015,
						"authors":"Jesús O. Lacruz, Francisco García-Herrero, Javier Valls, Member, IEEE, and David Declercq, Senior Member, IEEE",
						"title":"One Minimum Only Trellis Decoder for Non-Binary Low-Density Parity-Check Codes",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—I: REGULAR PAPERS, VOL. 62, NO. 1, JANUARY 2015"},
						{
						"year":2014,
						"authors":"Gurtac Yemiscioglu , Peter Lee",
						"title":"Very-large-scale integration implementation of a 16-bit clocked adiabatic logic logarithmic signal processor",
						"details":"ISSN 1751-8601 Received on 15th May 2014 Accepted on 31st October 2014 doi: 10.1049/iet-cdt.2014.0102 www.ietdl.org"},
						{
						"year":2014,
						"authors":"Djaafar Chabi, Weisheng Zhao, Member, IEEE, Erya Deng, Yue Zhang, Student Member, IEEE,Nesrine Ben Romdhane, Jacques-Olivier Klein, Member, IEEE, and Claude Chappert, Member, IEEE",
						"title":"Ultra Low Power Magnetic Flip-Flop Based on Checkpointing/Power Gating and Self-Enable Mechanisms",
						"details":"IEEE TRANSACTIONS ON CIRCUITS AND SYSTEMS—I: REGULAR PAPERS, VOL. 61, NO. 6, JUNE 2014"},
						{
						"year":2014,
						"authors":"Nicola Petra n, DavideDeCaro,ValeriaGarofalo,EttoreNapoli,AntonioG.M.Strollo",
						"title":"Truncated squarer with minimum mean-square error",
						"details":"Micro electronics Journal 45 (2014) 799–804"},
						{
						"year":2014,
						"authors":"Alex Pappachen James, Dinesh S. Kumar, and Arun Ajayan",
						"title":"Threshold Logic Computing: Memristive-CMOS Circuits for Fast Fourier Transform and Vedic Multiplication",
						"details":"IEEE TRANSACTIONS ON VERY LARGE SCALE INTEGRATION (VLSI) SYSTEMS"},
						{
						"year":2014,
						"authors":"Siti Zarina Md Naziri, Rizalafande Che Ismail, Ali Yeon Md Shakaff",
						"title":"The Design Revolution of Logarithmic Number System Architecture",
						"details":"2014 2nd International Conference on Electrical, Electronics and System Engineering (ICEESE)"},
						{
						"year":2014,
						"authors":"Anjana S,*, Pradeep C, Philip Samuel",
						"title":"Synthesize of High Speed Floating-point Multipliers Based on Vedic Mathematics",
						"details":"International Conference on Information and Communication Technologies (ICICT 2014)"},
						{
						"year":2014,
						"authors":"Mark G. Arnold · Sylvain Collange",
						"title":"Options for Denormal Representation in Logarithmic Arithmetic",
						"details":"J Sign Process Syst (2014) 77:207–220 DOI 10.1007/s11265-014-0874-3"},
						{
						"year":2014,
						"authors":"Atul Rahman#, Abdullah-Al-Kafi#, Mr. Khalid#, A.T.M. Saiful Islam*, Mahmudur Rahman",
						"title":"Optimized Hardware Architecture for Implementing IEEE 754 Standard Double Precision Floating Point Adder/Subtractor",
						"details":"2014 17th International Conference on Computer and Information Technology (ICCIT)"},
						{
						"year":2014,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Multiplier-less pipeline architecture for lifting-based two-dimensional discrete wavelet transform",
						"details":"Published in IET Computers & Digital Technique Received on 13th January 2014 Revised on 21st May 2014 Accepted on 26th July 2014 doi: 10.1049/iet-cdt.2013.0167"},
						{
						"year":2014,
						"authors":"Alexandru Amaricai, Oana Boncalo, Constantina-Elena Gavriliu",
						"title":"Low-precision DSP-based floating-point multiply-add fused for Field Programmable Gate Arrays",
						"details":"Published in IET Computers & Digital Techniques Received on 7th September 2013 Revised on 21st February 2014 Accepted on 25th March 2014 doi: 10.1049/iet-cdt.2013.0128"},
						{
						"year":2013,
						"authors":"Ch. Srigowri, Douglas L. M.Srihari",
						"title":"VLSI Design of Low Power Reversible 8-bit Barrel Shifter",
						"details":"INTERNATIONAL JOURNAL OF TECHNOLOGICAL EXPLORATION AND LEARNING (IJTEL) www.ijtel.org"},
						{
						"year":2013,
						"authors":"Joshua Yung Lih Low, Ching Chuen Jong",
						"title":"Non-iterative High Speed Division Computation Based on Mitchell Logarithmic Method",
						"details":"978-1-4673-5762-3/13/$31.00 ©2013 IEEE"},
						{
						"year":2013,
						"authors":"Basant K. Mohanty · Vikas Tiwari",
						"title":"Modified PEB Formulation for Hardware-Efficient Fixed-Width Booth Multiplier",
						"details":"Circuits Syst Signal Process (2014) 33:3981–3994 DOI 10.1007/s00034-014-9843-0"},
						{
						"year":2013,
						"authors":"Vaibhav Gupta, Debabrata Mohapatra, Anand Raghunathan, Fellow, IEEE, and Kaushik Roy, Fellow, IEEE",
						"title":"Low-Power Digital Signal Processing Using Approximate Adders",
						"details":"IEEE TRANSACTIONS ON COMPUTER-AIDED DESIGN OF INTEGRATED CIRCUITS AND SYSTEMS, VOL. 32, NO. 1, JANUARY 2013"},
						{
						"year":2013,
						"authors":"Shambhavi Mishra , Gaurav Verma",
						"title":"Low Power and Area Efficient Implementation of BCD Adder on FPGA",
						"details":"978-1 -4799-1 607-8/1 3/$31 .00©201 3 I E E E"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},
						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},

						{
						"year":2016,
						"authors":"Abhishek Kumar Jain, Douglas L. Maskell,Suhaib A. Fahmy",
						"title":"Throughput Oriented FPGA Overlays Using DSP Blocks",
						"details":"Design, Automation & Test in Europe Conference & Exhibition"},

					
					{
						"year":2013,
						"authors":["M. COMBET, H. VAN ZONNEVELD, AND L. VERBEEK,"],
						"title":"Computation of the Base Two Logarithm of Binary Numbers",
						"details":"IEEE TRANSACTIONS ON ELECTRONIC COMPUTERS VOL. EC-14, NO. 6 DECEMBER, 1963"} 

			];
							*/

			$http.get('assets/lnsresearch.json').success(function(response){
			$scope.paperslist=response;
			$scope.paperslist=$filter('orderBy')($scope.paperslist,'year');
		})
		});



