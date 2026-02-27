import InvestigationOrder from "../models/InvestigationOrder.js";
import PatientVisit from "../models/PatientVisitSchema.js";

export const createInvestigationOrder = async (req, res) => {
    const {
      visitId,
      investigationId,
      priceAtOrderTime,
      priority,
      source,
      sampleCollectedAt
    } = req.body;
  
    if (!visitId) return res.status(400).json({ message: "Visit Id is required" });
    if (!investigationId) return res.status(400).json({ message: "Investigation Id is required" });
    if (!priceAtOrderTime) return res.status(400).json({ message: "Price is required" });
    if (!priority) return res.status(400).json({ message: "Priority is required" });
    if (!source) return res.status(400).json({ message: "Source is required" });
    if (!sampleCollectedAt) return res.status(400).json({ message: "SampleCollectedAt is required" });
  
    try {
      // Check Visit
      const visit = await PatientVisit.findById(visitId);
      if (!visit) {
        return res.status(404).json({ message: "Visit Id invalid" });
      }
  
      // Create Investigation Order
      const createInvestigation = await InvestigationOrder.create({
        visitId,
        investigationId,
        priceAtOrderTime,
        priority,
        source,
        sampleCollectedAt,
        createdBy: req.user.id
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
      const { visitId, orderStatus, priority, startDate, endDate,page=1,limit=20 } = req.query;
  
      let filter = {};
  
      if (visitId) filter.visitId = visitId;
      if (orderStatus) filter.orderStatus = orderStatus;
      if (priority) filter.priority = priority;
  
      if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  const skip=(page-1)*limit;
      const orders = await InvestigationOrder.find(filter)
        .populate("visitId")
        .populate("investigationId")
        .populate("createdBy")
        .sort({ createdAt: -1 });
  
      return res.status(200).json({ orders });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
//   Get by id
export const getInvestigationOrderById = async (req, res) => {
    try {
      const order = await InvestigationOrder.findById(req.params.id)
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
      const orders = await InvestigationOrder.find({
        visitId: req.params.visitId
      }).populate("investigationId");
  
      return res.status(200).json({ orders });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
//   updte order status 
export const updateOrderStatus = async (req, res) => {
    try {
      const { orderStatus } = req.body;
  
      const order = await InvestigationOrder.findByIdAndUpdate(
        req.params.id,
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
      const { result, reportFile } = req.body;
  
      const order = await InvestigationOrder.findByIdAndUpdate(
        req.params.id,
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
      const order = await InvestigationOrder.findByIdAndDelete(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      return res.status(200).json({ message: "Order deleted successfully" });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };