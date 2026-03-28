import InvestigationOrder from "../models/InvestigationOrder.js";
import PatientVisit from "../models/PatientVisitSchema.js";

export const createInvestigationOrder = async (req, res) => {
    const { hospitalId, branchId, id: userId } = req.user;
    const {
      visitId,
      patientId,
      encounterType,
      ipdAdmissionId,
      investigationId,
      priceAtOrderTime,
      priority,
      source,
      sampleCollectedAt
    } = req.body;
  
    if (!investigationId) return res.status(400).json({ message: "Investigation Id is required" });
    if (!priceAtOrderTime) return res.status(400).json({ message: "Price is required" });
    if (!priority) return res.status(400).json({ message: "Priority is required" });
    if (!source) return res.status(400).json({ message: "Source is required" });
  
    try {
      // Create Investigation Order
      const createInvestigation = await InvestigationOrder.create({
        hospitalId,
        branchId,
        patientId,
        encounterType: encounterType || "OPD",
        visitId,
        ipdAdmissionId,
        investigationId,
        priceAtOrderTime,
        priority,
        source,
        sampleCollectedAt,
        createdBy: userId
      });
  
      return res.status(201).json({
        message: "Test Created Successfully",
        createInvestigation
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

export const getAllInvestigationOrders = async (req, res) => {
    try {
      const { hospitalId, branchId } = req.user;
      const { visitId, patientId, orderStatus, priority, startDate, endDate, page=1, limit=20 } = req.query;
  
      let filter = { hospitalId, branchId };
  
      if (visitId) filter.visitId = visitId;
      if (patientId) filter.patientId = patientId;
      if (orderStatus) filter.orderStatus = orderStatus;
      if (priority) filter.priority = priority;
  
      if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      const orders = await InvestigationOrder.find(filter)
        .populate("visitId")
        .populate("patientId")
        .populate("investigationId")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await InvestigationOrder.countDocuments(filter);
  
      return res.status(200).json({ 
        success: true,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        orders 
      });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
//   Get by id
export const getInvestigationOrderById = async (req, res) => {
    try {
      const { hospitalId } = req.user;
      const order = await InvestigationOrder.findOne({ _id: req.params.id, hospitalId })
        .populate("visitId investigationId createdBy");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({ order });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
//   get order by visit 
export const getOrdersByVisit = async (req, res) => {
    try {
      const { hospitalId } = req.user;
      const orders = await InvestigationOrder.find({
        visitId: req.params.visitId,
        hospitalId
      }).populate("investigationId");
  
      return res.status(200).json({ orders });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

//   update order status 
export const updateOrderStatus = async (req, res) => {
    try {
      const { hospitalId } = req.user;
      const { orderStatus } = req.body;
  
      const order = await InvestigationOrder.findOneAndUpdate(
        { _id: req.params.id, hospitalId },
        { orderStatus },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({ message: "Status updated", order });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

//   Add Test result
export const addInvestigationResult = async (req, res) => {
    try {
      const { hospitalId } = req.user;
      const { result, reportFile } = req.body;
  
      const order = await InvestigationOrder.findOneAndUpdate(
        { _id: req.params.id, hospitalId },
        {
          result,
          reportFile,
          orderStatus: "Completed",
          completedAt: new Date()
        },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({ message: "Result added", order });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

//   Delete 
export const deleteInvestigationOrder = async (req, res) => {
    try {
      const { hospitalId } = req.user;
      const order = await InvestigationOrder.findOneAndDelete({ _id: req.params.id, hospitalId });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({ message: "Order deleted successfully" });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };